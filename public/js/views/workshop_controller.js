const arrCharacter_sheets = [
    {
        'sect-main' : [
            'BOB', 
            [['HP','10','10']], 
            ['5',['VIGOR','5']]
        ],
        'sect-skills' : [
            ['SURVIVAL','5']
        ],
        'sect-abilitys' : [
            ['P','U','N']
        ]
    }
]

var cSheetIndex = arrCharacter_sheets.length - 1;
var character_sheet = arrCharacter_sheets[cSheetIndex];

updatePage();

//#region /*--------------------Main--------------------*/

document.getElementById('add-bar').addEventListener('click', () => {addBar(["","0","0"])});

document.getElementById('add-attribute').addEventListener('click', () => {addLabeledValue(["","0"], 'attribute', 'attributes-conteiner')});

function addBar(data) {
    const barEnum = {'name': 0, 'current': 1, 'max': 2};

    const barName = data[barEnum.name];
    const barCurrent = data[barEnum.current];
    const barMax = data[barEnum.max];

    const divBar = document.createElement('div');
    divBar.className = "bar-body"

    const bntDeleteBar = document.createElement('button');
    const spanDeleteBar = document.createElement('span');

    bntDeleteBar.className = "bnt black-white skill-delete"
    Object.assign(spanDeleteBar, {
        className: 'material-symbols-outlined',
        textContent: 'delete'
    })
    bntDeleteBar.appendChild(spanDeleteBar);
    bntDeleteBar.addEventListener('click', function() {
        this.closest('.bar-body').remove()
    });

    const inputBarName = document.createElement('input');
    Object.assign(inputBarName, {
        type: 'text',
        className: 'bar input name',
        maxLength: '30',
        placeholder: "BAR'S NAME",
        value: barName
    })

    const spanBarDots = document.createElement('span')
    spanBarDots.textContent = ':' 

    const inputBarCurrentValue = document.createElement('input');
    Object.assign(inputBarCurrentValue, {
        type: 'number',
        className: 'bar input value current-value',
        value: barCurrent
    })

    const spanBarSlash = document.createElement('span')
    spanBarSlash.textContent = '/' 

    const inputBarMaxValue = document.createElement('input');
    Object.assign(inputBarMaxValue, {
        type: 'number',
        className: 'bar input value max-value',
        value: barMax
    })

    divBar.appendChild(bntDeleteBar);
    divBar.appendChild(inputBarName);
    divBar.appendChild(spanBarDots);
    divBar.appendChild(inputBarCurrentValue);
    divBar.appendChild(spanBarSlash);
    divBar.appendChild(inputBarMaxValue)

    document.getElementById("bars-conteiner").appendChild(divBar);
} 

//#endregion

//#region /*--------------------Skills--------------------*/

document.getElementById('add-skill').addEventListener('click', () => {addLabeledValue(["","0"], 'skill', 'skills-conteiner')});

//#endregion

//#region /*--------------------Abilitys--------------------*/

document.getElementById('add-ability').addEventListener('click', function() {addAbility(["","",""])});

function abilityCollapseBnt() 
{
    const ability = this.closest('.ability-body');
    ability.classList.toggle("collapsed");
}
function abilityDeleteBnt() 
{
    const ability = this.closest('.ability-body');
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
    divAbility.className = 'ability-body collapsed';

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

//#endregion

//#region /*--------------------Labeled Value--------------------*/

function addLabeledValue(data, type, conteiner) {

    const labeledValueEnum = { 'name': 0, 'value': 1 }

    const labeledValueName  = data[labeledValueEnum.name];
    const labeledValue_value = data[labeledValueEnum.value];

    /*-----DOM elements-----*/

    const divLabeledValue = document.createElement('div');
    divLabeledValue.className = 'labeled-value-body'

    const bntUpLabeledValue  = document.createElement('button');
    const spanUpLabeledValue = document.createElement('span');

    bntUpLabeledValue.className = "bnt white-black"
    Object.assign(spanUpLabeledValue, {
        className: 'material-symbols-outlined',
        textContent: 'keyboard_arrow_up'
    })
    bntUpLabeledValue.appendChild(spanUpLabeledValue);
    bntUpLabeledValue.addEventListener('click', function() {
        const labeledValue_value = this.closest('.labeled-value-body').querySelector('.value')
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
        const labeledValue_value = this.closest('.labeled-value-body').querySelector('.value')
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
        this.closest('.labeled-value-body').remove()
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
        case 'attribute':
            divLabeledValue.appendChild(inputLabeledValueName);
            defaultAppend();
            divLabeledValue.appendChild(bntDeleteLabeledValue);
            break;
    }

    document.getElementById(conteiner).appendChild(divLabeledValue)
}

//#endregion

//#region //--------------------Outro--------------------//

document.getElementById('saveBtn').addEventListener('click', saveCharactherData)

function saveCharactherData() {
    //Setting var to store c-sheet's data
    const dataToStore = { 'sect-main' : [], "sect-skills" : [], 'sect-abilitys': [] };

    //Caracther's name
    dataToStore["sect-main"].push(document.getElementById('sect-main-character-name').value);

    //Caracther's bars
    const c_bars = document.querySelectorAll('.bar-body');
    if (c_bars.length != 0) {
        const arrBars = [];
        c_bars.forEach(bar => {
            const barLabel        = bar.querySelector('.name').value;
            const barCurrentValue = bar.querySelector('.current-value').value;
            const barMaxValue     = bar.querySelector('.max-value').value;

            arrBars.push([
                barLabel.trim(), 
                barCurrentValue == "" ? "0" : barCurrentValue, 
                barMaxValue == "" ? "0" : barMaxValue
            ])
        });
        dataToStore["sect-main"].push(arrBars);
    } else {
        dataToStore["sect-main"].push([["", "0", "0"]]);
    }

    //Caracther's attributes
    const c_currentLevel = document.querySelector('.current-level-input').value;
    dataToStore["sect-main"].push([c_currentLevel == "" ? "0" : c_currentLevel]);

    const c_attributes = document.getElementById('attributes-conteiner').querySelectorAll('.labeled-value-body');
 
    if (c_attributes.length != 0) {
        c_attributes.forEach(attribute => {
            const attributeLabel = attribute.querySelector('.name').value;
            const attributeValue = attribute.querySelector('.value').value;

            dataToStore["sect-main"][2].push([
                attributeLabel.trim(),
                attributeValue == "" ? "0" : attributeValue
            ])
        });
    } else {
        dataToStore["sect-main"][2].push(["","0"]);
    }

    //Caracther's skills 
    const c_skills = document.getElementById('skills-conteiner').querySelectorAll('.labeled-value-body');
    if (c_skills.length != 0) {
        c_skills.forEach(skill => {
            const skillLabel = skill.querySelector('.name').value;
            const skillValue = skill.querySelector('.value').value;

            dataToStore["sect-skills"].push([
                skillLabel.trim(),
                skillValue == "" ? "0" : skillValue
            ]);
        });
    } else {
        dataToStore["sect-skills"].push(["","0"]);
    }

    //Caracther's Abilitys
    const c_abilitys = document.querySelectorAll('.ability-body');
    if (c_abilitys.length != 0) {
        c_abilitys.forEach(ability => {
            const abilityName = ability.querySelector('.ability-name').value;
            const abilityDesc = ability.querySelector('.ability-desc').value;
            const abilityRoll = ability.querySelector('.ability-roll').value;
            dataToStore["sect-abilitys"].push([
                abilityName.trim(),
                abilityDesc.trim(),
                abilityRoll.trim()
            ]);
        });
    } else {
        dataToStore["sect-abilitys"].push(["","",""]);
    }

    return dataToStore;
}

function updatePage() 
{
    const c_bars = document.getElementById('bars-conteiner').querySelectorAll('.bar-body')
    if (c_bars.length != 0) {
        c_bars.forEach(bar => {
            bar.remove()
        })
    }
    const c_attributes = document.getElementById('attributes-conteiner').querySelectorAll('.labeled-value-body')
    if (c_attributes.length != 0) {
        c_attributes.forEach(attribute => {
            attribute.remove()
        })
    }

    const containers = [
        document.getElementById('skills-conteiner'),
        document.getElementById('abilitys-conteiner')
    ]
    containers.forEach(container => {
        container.innerHTML = ''
    })

    const sectMainEnum = { "name": 0, "bars": 1, "attributes": 2};
    const sectMainData = character_sheet["sect-main"];

    const mainNome       = sectMainData[sectMainEnum.name];
    const mainBars       = sectMainData[sectMainEnum.bars];
    const mainAttributes = sectMainData[sectMainEnum.attributes];

    document.getElementById('sect-main-character-name').value = mainNome;

    mainBars.forEach(bar => {
        addBar(bar)
    })

    document.getElementById('current-level').value = mainAttributes[0 /*level*/];

    mainAttributes.forEach(attribute => {
        if (Array.isArray(attribute)) { addLabeledValue(attribute, 'attribute', 'attributes-conteiner') }
    });

    character_sheet["sect-skills"].forEach(skill => {addLabeledValue(skill, 'skill', 'skills-conteiner')});

    character_sheet["sect-abilitys"].forEach(ability => {addAbility(ability)});

    updateSideBar()
}

function logoutAcc() {
    character_sheet = arrCharacter_sheets[Math.round(Math.random())]
    updatePage()
}

function addCSheet() {
    arrCharacter_sheets.push({
        'sect-main' : [
            '', 
            [['','0','0']], 
            ['0',['','0']]
        ],
        'sect-skills' : [
            ['','0']
        ],
        'sect-abilitys' : [
            ['','','']
        ]
    });
    arrCharacter_sheets[cSheetIndex] = saveCharactherData();

    cSheetIndex = arrCharacter_sheets.length - 1
    character_sheet = arrCharacter_sheets[arrCharacter_sheets.length - 1];
    updatePage();
}

document.getElementById('add-sheet').addEventListener('click', addCSheet)

//#endregion

function updateSideBar() {
    document.getElementById('c-sheets-conteiner').innerHTML = ''
    for (var i = arrCharacter_sheets.length - 1; i >= 0; i--) 
    {
        const divCSheet        = document.createElement('div');
        const bntCSheetLabel   = document.createElement('button');
        const spanCSheetLabel  = document.createElement('span');
        

        divCSheet.className = 'c-sheet-body'
        Object.assign(bntCSheetLabel, {
            className: 'bnt black-white sheet-name',
        })

        const sheetNome = arrCharacter_sheets[i]["sect-main"][0]
        Object.assign(spanCSheetLabel, {
            textContent: sheetNome.trim() == "" ? "..." : sheetNome.trim(),
        })
        bntCSheetLabel.value = i
        bntCSheetLabel.appendChild(spanCSheetLabel);
        bntCSheetLabel.addEventListener('click', function() {
            if (cSheetIndex != this.value) {
                arrCharacter_sheets[cSheetIndex] = saveCharactherData()

                cSheetIndex = this.value
                character_sheet = arrCharacter_sheets[cSheetIndex];
                updatePage();
            }
            else {
                arrCharacter_sheets[cSheetIndex] = saveCharactherData()
                character_sheet = arrCharacter_sheets[cSheetIndex];
                updatePage();
            }
        })

        const bntDeleteCSheet  = document.createElement('button');
        const spanDeleteCSheet = document.createElement('span');

        bntDeleteCSheet.className = 'bnt black-white'
        bntDeleteCSheet.value = i
        
        Object.assign(spanDeleteCSheet, {
            className: "material-symbols-outlined",
            textContent: 'delete'
        })
        bntDeleteCSheet.appendChild(spanDeleteCSheet)
        bntDeleteCSheet.addEventListener('dblclick', function() {
            const index = Number(this.value);
            arrCharacter_sheets.splice(index, 1);

            if (arrCharacter_sheets.length === 0) {
                arrCharacter_sheets.push({
                    'sect-main' : [
                        '', 
                        [['','0','0']], 
                        ['0',['','0']]
                    ],
                    'sect-skills' : [
                        ['','0']
                    ],
                    'sect-abilitys' : [
                        ['','','']
                    ]
                });
            }
            
            cSheetIndex = arrCharacter_sheets.length - 1;
            character_sheet = arrCharacter_sheets[cSheetIndex];

            updatePage();
        });

        //Add to HTML
        divCSheet.appendChild(bntCSheetLabel)
        divCSheet.appendChild(bntDeleteCSheet)

        document.getElementById('c-sheets-conteiner').appendChild(divCSheet)
    }
}

//Saves current sheet and return all sheets' data
function collectAllSheets() {
    // Save current sheet data
    const currentData = saveCharactherData();
    
    //Update the current sheet index in the array
    arrCharacter_sheets[cSheetIndex] = currentData;

    //Return all sheets data
    return arrCharacter_sheets;
}

// Expose the function to the global scope
window.collectAllSheets = collectAllSheets;