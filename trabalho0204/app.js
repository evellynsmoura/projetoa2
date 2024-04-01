

const PORT = 4800;

const http = require ('http');
const url = require ('url');
const fs = require('fs');

const server = http.createServer((req, res) =>{

    const reqUrl = url.parse(req.url, true);
    const path = reqUrl.pathname;
    const query = reqUrl.query;
if (path === "/"){
    res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
    res.end(`Pagina Inicial`);
}
else if (path === "/imc"){
    const peso = parseFloat(query.pes)
    const altura = parseFloat(query.alt)
    if (isNaN(peso) || isNaN(altura)){
    }else{
        
        const imc = peso / (altura * altura) 

        if (imc < 18.5){
           
            fs.readFile('magreza.html', 'utf-8', (err, data) => {
                if(err){
                    res.writeHead(200, { 'Content-type': "text/plain; charset=utf-8" });
                    res.end(`Peso: ${peso.toFixed(2)}
            \nAltura: ${altura.toFixed(2)}
            \nSeu Imc é considerado Magreza: ${imc.toFixed(2)}`);

        }});
           



        }else if(imc >= 18.5 && imc <= 24.9){
            res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
            res.end(`Peso: ${peso.toFixed(2)}
            \nAltura: ${altura.toFixed(2)}
            \nSeu Imc é considerado Normal: ${imc.toFixed(2)}`);  
        }else if(imc >= 25 && imc <= 29.9){
            res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
            res.end(`Peso: ${peso.toFixed(2)}
            \nAltura: ${altura.toFixed(2)}
            \nSeu Imc é considerado Sobrepeso: ${imc.toFixed(2)}`);  
        }else if (imc >= 30 && imc <= 34.9){
            res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
            res.end(`Peso: ${peso.toFixed(2)}
            \nAltura: ${altura.toFixed(2)}
            \nSeu Imc é considerado Obesidade I: ${imc.toFixed(2)}`);
        }else if(imc >= 35 && imc <= 39.9){
            res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
            res.end(`Peso: ${peso.toFixed(2)}
            \nAltura: ${altura.toFixed(2)}
            \nSeu Imc é considerado Obesidade II: ${imc.toFixed(2)}`);            
        }else if (imc >= 40){
            res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
            res.end(`Peso: ${peso.toFixed(2)}
            \nAltura: ${altura.toFixed(2)}
            \nSeu Imc é considerado Obesidade III: ${imc.toFixed(2)}`);
        }
    
    }
}
    else if (path ==="/dolar"){
    
        const dolar = parseFloat(query.dolar);
        const real = parseFloat(query.real);
         if(isNaN(dolar) || isNaN(real)){
            res.writeHead(400, {'Content-Type': "text/plain; charset=utf-8"});
            res.end(`ERRO 400 - Valor de IMC invalido.`);
         }else{
            const conv = dolar*real;

            
        res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
        res.end(`Valor em Dolar: ${dolar.toFixed(2)}
         \nValor em Reais:${real.toFixed(2)} 
         \nValor Convertido:${conv.toFixed(2)}`);
         }
    }
    else if (path === "/notas"){
        const nota1 = parseFloat(query.n1);
        const nota2 = parseFloat(query.n2);
        const media = parseFloat(query.med);

        if (isNaN(nota1) || isNaN(nota2) || isNaN(media)){
            res.writeHead(400, {'Content-Type': "text/plain; charset=utf-8"});
            res.end(`ERRO 400 - Valor das notas invalidas.`);
        }else{
            const calculo = (nota1+nota2)/2;
            if (calculo >= media){
                res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
                res.end(`Aprovado \nMedia: ${media.toFixed(2)}`);
           }else{
            res.writeHead(200, {'Content-type': "text/plain; charset=utf-8"}); 
            res.end(`Reprovado \nMedia: ${media.toFixed(2)}`);
            }
        }
         
                    
        }
        
});

server.listen(PORT, () => {
    console.log (`[OK - Servidor iniciado em http://localhost:${PORT}]`);
})

//http://localhost:4800/dolar?dolar=1&real=5.01
//http://localhost:4800/notas?n1=6.0&med=6.0&n2=5.0
//http://localhost:4800/imc?pes=80&alt=1.80