const character_sheet = 
{
    'sect-main' : [
        'Lucas, o Mago', 
        [['HP','10','10'], ['MANA', '20', '30']], 
        ['20', ['VITALITY', '1'], ['INTELLIGENCE', '5']],
    ],
    'sect-skills' : [
        ['','0'],
        ['','0']
    ],
    'sect-abilitys' : [
        ['','',''],
        ['','',''],
    ]
};

/*--------------------MAIN--------------------*/

/*--------------------Skills--------------------*/

//Labeled Value handles pretty much all of this...
character_sheet["sect-skills"].forEach(skill => {addLabeledValue(skill, 'skill', 'skills-conteiner')});
//...Same...
document.getElementById('add-skill').addEventListener('click', () => {addLabeledValue(["","0"], 'skill', 'skills-conteiner')});

/*--------------------Abilitys--------------------*/

character_sheet["sect-abilitys"].forEach(ability => {addAbility(ability)});

document.getElementById('add-ability').addEventListener('click', function() {addAbility(["","",""])});

function abilityCollapseBnt() 
{
    const ability = this.closest('.ability');
    ability.classList.toggle("collapsed");
}
function abilityDeleteBnt() 
{
    const ability = this.closest('.ability');
    ability.remove();
}
function addAbility(abilityData) 
{
    //Ability's ENUM
    const abilityEnum = { 'name': 0, 'desc': 1, 'roll': 2 };
    //Ability's data
    const abilityName = abilityData[abilityEnum.name];
    const abilityDesc = abilityData[abilityEnum.desc];
    const abilityRoll = abilityData[abilityEnum.roll];

    /*-----DOM elements-----*/

    //Ability's conteiner
    const divAbility = document.createElement('div');
    divAbility.className = 'ability collapsed';

    //Ability's header
    const divAbilityHeader  = document.createElement('div');
    const inputAbilityName  = document.createElement('input');
    const btnAbilityToggle  = document.createElement('button');
    const spanAbilityToggle = document.createElement('span');
    const btnAbilityDelete  = document.createElement('button');
    const spanAbilityDelete = document.createElement('span');

    divAbilityHeader.className = 'ability-header'
    Object.assign(inputAbilityName, {
        type: 'text', 
        maxLength: '30',
        placeholder: "ABILITY'S NAME", 
        className: 'ability-name', 
        value: abilityName
    });

    btnAbilityToggle.className = 'bnt white-black ability-toggle';
    Object.assign(spanAbilityToggle, {
        className: 'material-symbols-outlined',
        textContent: 'arrow_drop_down'
    });
    btnAbilityToggle.appendChild(spanAbilityToggle);
    btnAbilityToggle.addEventListener('click', abilityCollapseBnt);

    btnAbilityDelete.className = 'bnt white-black ability-delete';
    Object.assign(spanAbilityDelete, {
        className: 'material-symbols-outlined',
        textContent: 'delete'
    });
    btnAbilityDelete.appendChild(spanAbilityDelete);
    btnAbilityDelete.addEventListener('click', abilityDeleteBnt);

    divAbilityHeader.appendChild(inputAbilityName);
    divAbilityHeader.appendChild(btnAbilityToggle);
    divAbilityHeader.appendChild(btnAbilityDelete);

    //Ability's description
    const inputAbilityDesc  = document.createElement('textarea');

    Object.assign(inputAbilityDesc, {
        rows: '5', 
        maxLength: '300', 
        placeholder: "ABILITY'S DESCRIPTION", 
        className: 'ability-desc', 
        value: abilityDesc
    });

    //Ability's footer
    const divAbilityFooter  = document.createElement('div');
    const pAbilityRoll      = document.createElement('p');
    const inputAbilityRoll  = document.createElement('input');

    divAbilityFooter.className = 'ability-footer';
    pAbilityRoll.textContent   = 'ROLLS:';

    Object.assign(inputAbilityRoll, {
        type: 'text', 
        maxLength: '30',
        placeholder: 'XdXX + X', 
        className: 'ability-roll', 
        value: abilityRoll
    });

    divAbilityFooter.appendChild(pAbilityRoll);
    divAbilityFooter.appendChild(inputAbilityRoll);

    //Add ability to HTML
    divAbility.appendChild(divAbilityHeader);
    divAbility.appendChild(inputAbilityDesc);
    divAbility.appendChild(divAbilityFooter);

    document.getElementById('abilitys-conteiner').appendChild(divAbility)
}

/*-----Labeled Value-----*/

function addLabeledValue(data, type, conteiner) {

    const labeledValueEnum = { 'name': 0, 'value': 1 }

    const labeledValueName  = data[labeledValueEnum.name];
    const labeledValue_value = data[labeledValueEnum.value];

    /*-----DOM elements-----*/

    const divLabeledValue = document.createElement('div');
    divLabeledValue.className = 'labeled-value'

    const bntUpLabeledValue  = document.createElement('button');
    const spanUpLabeledValue = document.createElement('span');

    bntUpLabeledValue.className = "bnt white-black"
    Object.assign(spanUpLabeledValue, {
        className: 'material-symbols-outlined',
        textContent: 'keyboard_arrow_up'
    })
    bntUpLabeledValue.appendChild(spanUpLabeledValue);
    bntUpLabeledValue.addEventListener('click', function() {
        const labeledValue_value = this.closest('.labeled-value').querySelector('.value')
        labeledValue_value.value = Math.min(Number(labeledValue_value.value) + 1, 999);
    });

    const inputLabeledValue_value = document.createElement('input');
    Object.assign(inputLabeledValue_value, {
        type: 'number',
        className: 'labeled-value textarea value',
        value: labeledValue_value
    })
    
    const bntDownLabeledValue  = document.createElement('button');
    const spanDownLabeledValue = document.createElement('span');

    bntDownLabeledValue.className = "bnt white-black"
    spanDownLabeledValue.style.transform = 'rotate(180deg)'
    Object.assign(spanDownLabeledValue, {
        className: 'material-symbols-outlined',
        textContent: 'keyboard_arrow_up'
    })
    bntDownLabeledValue.appendChild(spanDownLabeledValue);
    bntDownLabeledValue.addEventListener('click', function() {
        const labeledValue_value = this.closest('.labeled-value').querySelector('.value')
        labeledValue_value.value = Math.max(Number(labeledValue_value.value) - 1, -999);
    });

    const inputLabeledValueName = document.createElement('input');
    Object.assign(inputLabeledValueName, {
        type: 'text',
        className: 'labeled-value textarea name',
        placeholder: type.toUpperCase() + "'S NAME",
        maxLength: '25',
        value: labeledValueName
    })
    
    const bntDeleteLabeledValue  = document.createElement('button');
    const spanDeleteLabeledValue = document.createElement('span');

    bntDeleteLabeledValue.className = "bnt black-white skill-delete"
    Object.assign(spanDeleteLabeledValue, {
        className: 'material-symbols-outlined',
        textContent: 'delete'
    })
    bntDeleteLabeledValue.appendChild(spanDeleteLabeledValue);
    bntDeleteLabeledValue.addEventListener('click', function() {
        this.closest('.labeled-value').remove()
    });

    const defaultAppend = function() {
        divLabeledValue.appendChild(bntUpLabeledValue);
        divLabeledValue.appendChild(inputLabeledValue_value);
        divLabeledValue.appendChild(bntDownLabeledValue); 
    }

    switch(type) {
        case 'skill':
            defaultAppend();
            divLabeledValue.appendChild(inputLabeledValueName);
            divLabeledValue.appendChild(bntDeleteLabeledValue);
            break;
        case 'stat':
            divLabeledValue.appendChild(inputLabeledValueName);
            defaultAppend();
            divLabeledValue.appendChild(bntDeleteLabeledValue);
            break;
    }

    document.getElementById(conteiner).appendChild(divLabeledValue)
}