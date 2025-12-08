const admin = require('firebase-admin');

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Pega o header de autorização (Ex: "Bearer eyJhbGciOi...")
        const authHeader = req.headers.authorization;

        // 2. Validação básica: O header existe e começa com "Bearer "?
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Token não fornecido ou mal formatado.',
                details: 'O cabeçalho Authorization deve ser: Bearer <token>'
            });
        }

        // 3. Extrai apenas o token (remove a palavra "Bearer ")
        const token = authHeader.split(' ')[1];

        // 4. Verifica a validade e decodifica o token com o Firebase Admin
        // Se o token for falso, expirado ou adulterado, isso vai gerar um erro (catch)
        const decodedToken = await admin.auth().verifyIdToken(token);

        // 5. Anexa os dados do usuário ao objeto req
        // Agora, nas suas rotas, você pode usar `req.user.uid`, `req.user.email`, etc.
        req.user = decodedToken;

        // 6. Passa para a próxima função (sua rota ou controller)
        next();

    } catch (error) {
        console.error('Erro de Autenticação:', error.code || error.message);

        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
        }
        
        return res.status(403).json({ error: 'Token inválido ou acesso negado.' });
    }
};

module.exports = authMiddleware;