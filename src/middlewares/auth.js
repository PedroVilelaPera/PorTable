const admin = require('firebase-admin');

exports.authMiddleware = async (req, res, next) => {
    try {
        // Picking the Authorization header from the request
        const authHeader = req.headers.authorization;

        // Verifying if the header exists and is well formatted
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Token não fornecido ou mal formatado.',
                details: 'O cabeçalho Authorization deve ser: Bearer <token>'
            });
        }

        // Extracting the token from the header
        const token = authHeader.split(' ')[1];

        // Verifying the token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);

        // Inserting user info into the request object
        req.user = decodedToken;

        // Proceeding to the next middleware or route handler
        next();

    } catch (error) {
        console.error('Erro de Autenticação:', error.code || error.message);

        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ error: 'Sessão expirada. Faça login novamente.' });
        }
        
        return res.status(403).json({ error: 'Token inválido ou acesso negado.' });
    }
};