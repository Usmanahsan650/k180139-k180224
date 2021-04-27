const LCSLength = (X,Y) => {
    let m = X.length;
    let n = Y.length;

    let lookup = [];

    for(let i=0; i<=m; i++){
        lookup[i] = [];
    }

    for(let i=0; i<=m; i++){
        lookup[i][0] = 0;
    }

    for(let j=0; j<=m; j++){
        lookup[0][j] = 0;
    }

    for(let i=1; i<=m; i++){
        for(let j=1; j<=n; j++){
            if(X[i-1] == Y[j-1])
                lookup[i][j] = lookup[i-1][j-1] + 1;
            
            else   
                lookup[i][j] = Math.max(lookup[i-1][j],lookup[i][j-1]);
        }
    }

    return lookup[m][n];
};

const generateInput = () => {
    let select;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            select = JSON.parse(this.responseText);
          }
    };
    xmlhttp.open("GET","input/json_LCS.txt",false); // false means 'synchronous'
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
        html = `Longest Common Subsequence`;
        div[i].innerHTML = html;
    }

    let inputs = ['.input1','.input2','.input3','.input4','.input5','.input6','.input7','.input8','.input9','.input10'];
    let sequence = generateInput(), res, i, j;
    i = j = 0;

    inputs.forEach((input,index) => {
        div = document.querySelector(input);

        res = LCSLength(sequence.seq1[i],sequence.seq2[j]);

        html = `<h3>Input ${index+1}</h3> <br>
                <p><em>Name : muhammad talha</em></p>
                <p>String 1: ${sequence.seq1[i++]} <br>String 2: ${sequence.seq2[j++]}</p>
                <br> <button id="button${index+1}"  onclick = "showOutput(this.id)">Show Output</button>
                <h4 id="output${index+1}" style="display:none;">The length of LCS is : ${res}</h4>`

        div.innerHTML = html;
    });
};

displayInput();