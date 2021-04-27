let dictionary = [];

const dictionaryContains = word => {
    for(let i=0; i<dictionary.length; i++){
        if(dictionary[i].localeCompare(word) == 0)
            return true;
    }
    return false;
};

const wordBreak = (str = 'muhammadtalha') => {
    if(str.length == 0)
        return true;
    
    let wb = [];
    for(let i=0; i<=str.length; i++){
        wb[i] = false;
    }

    for(let i=1; i<=str.length; i++){
        if(wb[i] == false && dictionaryContains(str.substr(0,i)))
            wb[i] = true;

        if(wb[i] == true){
            if(i == str.length)
                return true;
            
            for(let j=i+1; j<=str.length; j++){
                if(wb[j] == false && dictionaryContains(str.substr(i,j-i)))
                    wb[j] = true;

                if(j == str.length && wb[j] == true)
                    return true;
            }
        }
    }

    return false;
};

const generateInput = () => {
    let select;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            select = JSON.parse(this.responseText);
          }
    };
    xmlhttp.open("GET","input/json_wordBreak.txt",false);
    xmlhttp.send();

    return select;
};

const showOutput = button_id => {
    let x = document.getElementById(button_id).nextElementSibling;

    if(x.style.display === "none")
        x.style.display = "block";
    else
        x.style.display = "none";
};

const displayInput = () => {
    let div, html = ``;

    div = document.querySelectorAll(".algo");
    for(let i=0; i<div.length; i++){
        html = `Word Break`;
        div[i].innerHTML = html;
    }

    let inputs = ['.input1','.input2','.input3','.input4','.input5','.input6','.input7','.input8','.input9','.input10'];
    let data_set = generateInput(), res, k = 0;

    inputs.forEach((input,index) => {
        div = document.querySelector(input);

        dictionary = data_set.words[k++];
        res = wordBreak();

        html = `<h3>Input ${index+1}</h3> <br>
                <p><em>string : muhammad talha</em></p>`;

        html += `<div class="table-responsive"> <table class="table table-bordered"> <tbody> <tr>`;
        for(let i=0; i<dictionary.length; i++){
                html += `<td>${dictionary[i]}</td>`;
            }
        html += `</tr> </tbody> </table> </div>`;

        html += `<br> <button id="button${index+1}"  onclick = "showOutput(this.id)">Show Output</button>`;

        if(res)
            html += `<h4 id="output${index+1}" style="display:none;">String <strong>can</strong> be segmented.</h4>`;
        else
        html += `<h4 id="output${index+1}" style="display:none;">String <strong>cannot</strong> be segmented.</h4>`;

        div.innerHTML = html;
    });
};

displayInput();
console.log(dictionary);