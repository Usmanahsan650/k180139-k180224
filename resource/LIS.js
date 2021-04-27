const LIS = (arr,n) => {
    let L = [];

    for(let i=0; i<n; i++){
        L[i] = 0;
    }

    L[0] = 1;

    for(let i=1; i<n; i++){
        for(let j=0; j<i; j++){
            if(arr[j] < arr[i] && L[j] > L[i])
                L[i] = L[j];
        }
        L[i]++;
    }

    let max = L[0];
    for(let i=0; i<n; i++){
        if(L[i] > max)
            max = L[i];
    }

    return max;
};

const generateInput = () => {
    let select;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            select = JSON.parse(this.responseText);
          }
    };
    xmlhttp.open("GET","input/json_LIS.txt",false);
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
        html = `Longest Increasing Subsequence`;
        div[i].innerHTML = html;
    }

    let inputs = ['.input1','.input2','.input3','.input4','.input5','.input6','.input7','.input8','.input9','.input10'];
    let data_set = generateInput(), res, k = 0;

    inputs.forEach((input,index) => {
        div = document.querySelector(input);
        
        res = LIS(data_set.arr[k],data_set.arr[k].length);

        html = `<h3>Input ${index+1}</h3> <br>
                <p><em>n = ${data_set.arr[k].length}</em></p>`;

        html += `<div class="table-responsive"> <table class="table table-bordered"> <tbody> <tr>`;
        for(let i=0; i<data_set.arr[k].length; i++){
                html += `<td>${data_set.arr[k][i]}</td>`;
            }
        html += `</tr> </tbody> </table> </div>`;

        html += `<br> <button id="button${index+1}"  onclick = "showOutput(this.id)">Show Output</button>
                <h4 id="output${index+1}" style="display:none;">The length of LIS is : ${res}</h4>`;

        div.innerHTML = html;
        ++k;
    });
};

displayInput();