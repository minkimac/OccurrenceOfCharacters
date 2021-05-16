
var charCountDiv = document.getElementById("charCountDiv");
var errorBox = document.getElementById("errorBox");
var charTxtBox = document.getElementById("charTxtBox");
var ignoreCase = false;

async function onCharCountClicked() {
    let characters = charTxtBox.value.trim();
    if(!await isInputTextValid(characters))
        return;

    resetFields();

    let charsCount = ignoreCase ? getCharactersCount(characters.toUpperCase()) : getCharactersCount(characters);
    for (let charCount in charsCount) {
        charCountDiv.innerHTML += "<p>" + charCount + " = " + charsCount[charCount] + "</p>";
    }
    charCountDiv.hidden = false;
}

function getCharactersCount(characters) {
    var result = [...characters].reduce((accumulator, currentValue) => !accumulator[currentValue] ? { ...accumulator, [currentValue]: 1 } : { ...accumulator, [currentValue]: accumulator[currentValue] + 1 }, {});
    return result;
}

function onCasingChecked() {
    resetFields();
    ignoreCase = document.getElementById("ignoreCaseBox").checked ? true : false;
}

async function isInputTextValid(characters){    
    if (!/^[A-Za-z]+$/.test(characters)) {
        errorBox.innerHTML = "Invalid input. Only alphabets are allowed.";
        errorBox.style.display = "";

        if (!characters) {
            errorBox.innerHTML += "\nEnter some alphabet(s).";
        }

        if (characters.includes(" ")) {
            errorBox.innerHTML += "\nPlease remove the blank spaces.";
        }
        return false;
    }
    else {
        return true;
    }
}
function onTextChanged(){
    resetFields();
}
function resetFields() {
    errorBox.innerHTML = "";
    charCountDiv.innerHTML = "";
}

function onFileSelected(fileEvent) {
    resetFields();
    let file = fileEvent.target.files[0];
    if (file) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            isInputTextValid(contents);
            charTxtBox.value = contents;
        }
        r.readAsText(file);
    }
    else {
        alert("Failed to load file");
    }
}

document.getElementById('filePicker').addEventListener('change', onFileSelected, false);