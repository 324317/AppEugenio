let acri; // Declare acri outside the fetch request
let imagePath;

function fetchData(dataToSend) {
    const apiUrl = 'http://localhost:5000/calculate';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    };

    return new Promise((resolve, reject) => {
        fetch(apiUrl, requestOptions)
            .then(response => {
                // Check if response is an image
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('image')) {
                    // If response is an image, return a Promise that resolves with the image URL
                    resolve(response.blob().then(blob => URL.createObjectURL(blob)));
                } else {
                    // If response is not an image, parse response as JSON
                    response.json().then(data => {
                        // Extract calc_area and image_path from the response JSON
                        const calcArea = data.calc_area;
                        imagePath = data.image_path;
                        resolve({ calcArea, imagePath });
                    });
                }
            })
            .catch(error => {
                console.error('Error sending request:', error);
                reject(error);
            });
    });
}

function processData(calcArea, imagePath) {
    // Use calcArea and imagePath for further operations
    console.log('Processing data:', calcArea, imagePath);
}

function calcularSoma() {
    // var xFormatado = x.toFixed(5);
    // var zformatado = z.toFixed(5);
    // localStorage.setItem("x", xFormatado);
    // localStorage.setItem("z", zformatado);

    //recebendo inputs
    var h = parseFloat(document.getElementById('h').value);
    console.log('h:', h);

    var L = parseFloat(document.getElementById('L').value);
    console.log('L:', L);

    var q = parseFloat(document.getElementById('q').value);
    console.log('q:', q);

    var g = parseFloat(document.getElementById('g').value);
    console.log('g:', g);

    var classe = document.getElementById('classe').value;
    switch (classe) {
        case '1':
            var cobrimento = 2.5;
            break;
        case '2':
            var cobrimento = 3.0;
            break;
        case '3':
            var cobrimento = 4.0;
            break;
        case '4':
            var cobrimento = 5.0;
            break;
    }
    console.log('cobrimento:', cobrimento);

    var armLong = document.getElementById('armLong').value;
    switch (armLong) {
        case '5 φ':
            var bitolaUtilizada = 0.5;
            break;
        case '6,3 φ':
            var bitolaUtilizada = 0.63;
            break;
        case '8 φ':
            var bitolaUtilizada = 0.8;
            break;
        case '10 φ':
            var bitolaUtilizada = 1;
            break;
        case '12,5 φ':
            var bitolaUtilizada = 1.25;
            break;
        case '16 φ':
            var bitolaUtilizada = 1.6;
            break;
        case '20 φ':
            var bitolaUtilizada = 2;
            break;
        case '22,5 φ':
            var bitolaUtilizada = 2.25;
            break;
        case '25 φ':
            var bitolaUtilizada = 2.5;
            break;
        case '35 φ':
            var bitolaUtilizada = 3.5;
            break;
    }
    console.log('bitolaUtilizada:', bitolaUtilizada);

    var armTrans = document.getElementById('armTrans').value;
    switch (armTrans) {
        case '5 φ':
            var bitolaEstribo = 0.5;
            break;
        case '6,3 φ':
            var bitolaEstribo = 0.63;
            break;
    }
    console.log('bitolaEstribo:', bitolaEstribo);

    var d =
        h -
        (bitolaUtilizada / (2 * 100) +
            bitolaEstribo / 100 +
            cobrimento / 100);
    console.log('d:', d);
    var Mk = parseFloat(document.getElementById('Mk').value);
    console.log('Mk:', Mk);
    var Md = Mk * 1.4;
    console.log('Md:', Md);
    var bw = parseFloat(document.getElementById('bw').value);
    console.log('bw:', bw);

    var Fck = document.getElementById('Fck').value;
    console.log('Fck:', Fck);
    switch (Fck) {
        case '20MPa':
            var Fcd = 20000 / 1.4;
            var Fck = 20;
            break;
        case '25MPa':
            var Fcd = 25000 / 1.4;
            var Fck = 25;
            break;
        case '30MPa':
            var Fcd = 30000 / 1.4;
            var Fck = 30;
            break;
        case '40MPa':
            var Fcd = 40000 / 1.4;
            var Fck = 40;
            break;
        case '50MPa':
            var Fcd = 50000 / 1.4;
            var Fck = 50;
            break;
    }
    console.log('Fcd', Fcd);

    //xmais
    var term1 = 0.68 * d;
    var term2 = Math.sqrt(
        Math.pow(0.68 * d, 2) - 4 * 0.272 * (Md / (bw * Fcd))
    );
    var denominator = 0.544;
    var xMais = (term1 + term2) / denominator;
    console.log('xMais', xMais);

    //xmenos
    var term1 = 0.68 * d;
    var term2 = -Math.sqrt(
        Math.pow(0.68 * d, 2) - 4 * 0.272 * (Md / (bw * Fcd))
    );
    var denominator = 0.544;
    var xMenos = (term1 + term2) / denominator;
    console.log('xMenos', xMenos);

    //braços de alavanca
    var zMais = d - 0.4 * xMais;
    var zMenos = d - 0.4 * xMenos;
    console.log('zMais', zMais);
    console.log('zMenos', zMenos);

    var Fyk_Long = document.getElementById('Fyk_Long').value;
    console.log('Fyk_Long:', Fyk_Long);
    var Fyd_Long;
    switch (Fyk_Long) {
        case 'CA-50':
            Fyd_Long = 50 / 1.15;
            break;
        case 'CA-60':
            Fyd_Long = 60 / 1.15;
            break;
    }
    console.log('Fyd_Long(kN/cm2)', Fyd_Long);

    var Fyk_Trans = document.getElementById('Fyk_Trans').value;
    console.log('Fyk_Trans:', Fyk_Trans);
    var Fyd_Trans;
    switch (Fyk_Trans) {
        case 'CA-50':
            Fyd_Trans = 50 / 1.15;
            break;
        case 'CA-60':
            Fyd_Trans = 60 / 1.15;
            break;
    }
    console.log('Fyd_Trans(kN/cm2)', Fyd_Trans);

    var x;
    var areaAco = 0;
    if (xMais > h) {
        areaAco = Md / (zMenos * Fyd_Long);
        x = xMenos;
    } else {
        areaAco = Md / (zMais * Fyd_Long);
        x = xMais;
    }
    console.log('x: ', x);
    console.log('areaAco(cm²)', areaAco);

    var areaAcoMin = (0.17 / 100) * bw * h;
    console.log('areaAcoMin', areaAcoMin);

    if (areaAco < areaAcoMin) {
        areaAco = areaAcoMin;
    }

    //calculo de ah (espaçamento horizontal)
    // o diametro agregado sera escolhido depois
    var diametroAgregado = 2.5;
    var ah3 = 1.2 * diametroAgregado;
    var ahLista = [2.0, bitolaUtilizada / 10, ah3];
    var ahMin = Math.max(...ahLista);
    // console.log('ahMin',ahMin);
    var areaAcoBitola = (Math.PI * (bitolaUtilizada * bitolaUtilizada)) / 4;
    console.log('areaAcoBitola', areaAcoBitola);
    var numeroBarras = Math.ceil(areaAco / areaAcoBitola);
    console.log('numeroBarras', numeroBarras);
    var Asef = numeroBarras * areaAcoBitola;
    var As = Asef;
    console.log('Asef', Asef);
    var ah =
        (bw * 100 -
            (2 * cobrimento +
                2 * bitolaEstribo +
                numeroBarras * bitolaUtilizada)) /
        (numeroBarras - 1);
    // console.log('ah',ah);

    var fit = bitolaEstribo;
    console.log('fit: ', fit);
    var fi = bitolaUtilizada;
    console.log('fi: ', fi);
    var n = numeroBarras;
    while (ah < ahMin) {
        n = n - 1;
        if (n < 2) {
            // console.log('erro');
            break;
        } else {
            ah = (bw * 100 - (2 * cobrimento + 2 * fit + n * fi)) / (n - 1);
            console.log('ah: ', ah);
            ah3 = 1.2 * diametroAgregado;
            console.log('ah3: ', ah3);
            ahMin = [2, fi, ah3];
            ahMin = Math.max(...ahMin);
            console.log('ahMin: ', ahMin);
        }
    }

    console.log('ah', ah);
    console.log('ahMin', ahMin);
    // colocar verificação de ah

    //calculo de av (espaçamento vertical)
    // o diametro agregado sera escolhido depois
    diametroAgregado = 2.5;
    var av3 = 0.5 * diametroAgregado;
    var avLista = [2.0, bitolaUtilizada / 10, av3];
    var avMin = Math.max(...avLista);
    console.log('avMin', avMin);

    // verificação das armaduras transversais
    var Vk = parseFloat(document.getElementById('Vk').value);
    console.log('Vk:', Vk);
    var Vsd = Vk * 1.4;
    console.log('Vsd:', Vsd);
    var FckMPa = (Fcd * 1.4) / 1000;
    console.log('FckMPa:', FckMPa);
    var Fctm = 0.3 * Math.pow(FckMPa, 2 / 3);
    console.log('Fctm:', Fctm);
    var Fywk = Fyd_Trans * 1.15 * 10;
    console.log('Fywk:', Fywk);
    var roMin = 0.2 * (Fctm / Fywk);
    console.log('roMin:', roMin);

    var Vrd2 = 0.27 * (1 - FckMPa / 250) * (FckMPa / 14) * bw * d * 10000;
    console.log('Vrd2:', Vrd2);
    var Vc = (0.09 * Math.pow(FckMPa, 2 / 3) * bw * d * 10000) / 10;
    console.log('Vc:', Vc);
    var Vsw = Vsd - Vc;
    console.log('Vsw:', Vsw);
    var As_s = Vsw / (0.9 * d * Fyd_Trans);
    console.log('As_s:', As_s);
    var As_sMin = roMin * bw * 100 * 100;
    console.log('As_sMin:', As_sMin);
    if (As_s > As_sMin) {
        var AMaior = As_s;
    } else {
        var AMaior = As_sMin;
    }
    var numEstriboPorMetro = Math.ceil(
        AMaior / (2 * ((Math.PI * (bitolaEstribo * bitolaEstribo)) / 4))
    );
    console.log('numEstriboPorMetro:', numEstriboPorMetro);
    console.log(
        'area de aco da bitola transversal:',
        (Math.PI * (bitolaEstribo * bitolaEstribo)) / 4
    );
    var espacamentoEstribos = (100 / numEstriboPorMetro).toFixed(2);
    console.log('espacamentoEstribos:', espacamentoEstribos);
    var espacamentoMaxEstribos = [0.6 * d * 100, 30];
    var espacamentoMaxEstribos = Math.min(...espacamentoMaxEstribos);
    console.log('espacamentoMaxEstribos:', espacamentoMaxEstribos);
    // var L = 1 ;
    var detalhamentoFinalDosEstribos = `${numEstriboPorMetro} ${armTrans} C/ ${espacamentoEstribos}`;
    console.log(
        'detalhamentoFinalDosEstribos ',
        detalhamentoFinalDosEstribos
    );

    //SeçãoDupla
    var x_045d = 0.45 * d;
    console.log('x_045d: ', x_045d);
    var MdlimiteX045d =
        (0.68 * x_045d * d - 0.272 * x_045d * x_045d) * Fcd * bw;
    console.log('MdlimiteX045d: ', MdlimiteX045d);
    //CalculoArmaduraDupla
    var dLinha =
        cobrimento / 100 + bitolaUtilizada / (2 * 100) + bitolaEstribo / 100;
    console.log('dLinha: ', dLinha);
    var As2;
    var As1;
    var numeroBarraAs1;
    var numeroBarraAs2;
    var areaDupla;
    if (x > x_045d) {
        areaDupla = true;
        As2 = (Mk * 1.4 - MdlimiteX045d) / ((d - dLinha) * Fyd_Long);
        As1 = MdlimiteX045d / ((d - 0.4 * x_045d) * Fyd_Long);
        As = As1 + As2;
        numeroBarraAs1 = As1 / areaAcoBitola;
        numeroBarraAs2 = As2 / areaAcoBitola;
        console.log('numeroBarraAs1: ', numeroBarraAs1);
        console.log('numeroBarraAs2: ', numeroBarraAs2);
    } else {
        areaDupla = false;
        As2 = 0;
        As1 = 0;
        As = Asef;
        numeroBarraAs1 = As1 / areaAcoBitola;
        numeroBarraAs2 = As2 / areaAcoBitola;
    }
    console.log('As1: ', As1);
    console.log('As2: ', As2);
    console.log('As: ', As);

    // VARIÁVEIS PARA O CALCULO DE TRAÇÃO
    var Eci = 5600 * Math.sqrt(Fck);
    console.log('Eci: ', Eci);
    var ai = 0.8 + (0.2 * Fck) / 80;
    if (ai < 1) {
        ai = 1;
    }
    console.log('ai: ', ai);
    var Ecs = 0.85 * Eci;
    console.log('Ecs: ', Ecs);
    var Esi = 210000;
    var ae = Esi / Ecs; // depende do tipodeconcretousado
    console.log('ae: ', ae);

    var a1 = (bw * 100) / 2;
    console.log('a1: ', a1);
    var a2 = ae * Asef;
    console.log('a2: ', a2);
    var a3 = -(d * 100 * ae * Asef);
    console.log('a3: ', a3);

    // Fissuração
    var xii;
    if (
        (-a2 + Math.sqrt(Math.pow(a2, 2) - 4 * a1 * a3)) / (2 * a1) > 0 &&
        (-a2 + Math.sqrt(Math.pow(a2, 2) - 4 * a1 * a3)) / (2 * a1) < h * 100
    ) {
        xii = (-a2 + Math.sqrt(Math.pow(a2, 2) - 4 * a1 * a3)) / (2 * a1);
    } else {
        xii = (-a2 - Math.sqrt(Math.pow(a2, 2) - 4 * a1 * a3)) / (2 * a1);
    }
    console.log('xii: ', xii);

    var inercia2;
    if (areaDupla) {
        inercia2 =
            (bw * 100 * Math.pow(xii, 3)) / 3 +
            ae * As * Math.pow(xii - d * 100, 2) +
            ((ae - 1) * Math.pow(As2 * (xii - dLinha), 2)) / Math.pow(10, 8);
    } else {
        inercia2 =
            ((bw * 100 * xii * xii * xii) / 3 +
                ae * As * Math.pow(xii - d * 100, 2)) /
            100000000;
    }
    console.log('inercia2: ', inercia2);
    var tensaoDeTracao = ((mat / inercia2) * ae * (d - xii / 100)) / 1000;
    console.log('tensao de tracao: ', tensaoDeTracao);
    //---------------
    const dataToSend = {
        width: 30,
        height: 45,
        agressClass: 2,
        quantBar: 10,
        dBar: 1.25,
        dAgreg: 2.5,
        dEstribo: 0.5,
        av: 2
    };

    // Call the fetchData function and handle the Promise
    fetchData(dataToSend)
        .then(data => {
            console.log('Calculated area:', data.calcArea);
            console.log('Image path:', data.imagePath);
            acri = data.calcArea;
            // Call processData with the retrieved data
            processData(data.calcArea, data.imagePath);
            // receber valor do python
            console.log('Caminho da imagem testes: ', imagePath)
            console.log('acritestes: ', acri);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    var pri = areaAcoBitola / acri;
    console.log('pri: ', pri);
    var wk1 =
        (bitolaUtilizada / (12.5 * 2.25)) *
        (tensaoDeTracao / Esi) *
        ((4 / pri) * 45);
    console.log('wk1: ', wk1);
    var wk2 =
        (bitolaUtilizada * 3 * tensaoDeTracao * tensaoDeTracao) /
        (12.5 * 2.25 * Esi * Fctm);
    console.log('wk2: ', wk2);
    var inercia = (h * h * h * bw) / 12;
    console.log('inercia: ', inercia);
    // var q = 10; // g e q sao input's
    // var g = 15; // g e q sao input's
    var mat = ((g + q * 0.4) / (g + q)) * Mk; // g e q sao input's
    console.log('mat: ', mat);
    var mr = (1.5 * inercia * Fctm * 100) / (h * 0.5);
    console.log('mr: ', mr);
    var ieq =
        (Ecs / 10) *
        ((mr / mat) * (mr / mat) * (mr / mat) * inercia2 +
            (1 - (mr / mat) * (mr / mat) * (mr / mat) - inercia));
    console.log('ieq: ', ieq);
    console.log('Ecs*inercia*100000000: ', Ecs * inercia * 100000000);
    if (ieq >= Ecs * inercia * 100000000) {
        ieq = 'mensagem de erro';
    }
    console.log('ieq: ', ieq);
    // var L = 300 ; // input
    // console.log("L: ", L);
    var L = L * 100;
    console.log(
        `O L que está sendo usado é ${L} centímeros ou ${L / 100} metros`
    );

    var acaoPermanente = g * 0.5;
    var acaoQuasePermanente = (g + 0.3 * q) * 0.5; //=((C134+C135)+0,3*4)*0,5
    var acaoRara = (g + q) * 0.5; // =(C134+C135+4)*0,5
    console.log(`acaoQuasePermanente: ${acaoQuasePermanente}`);

    var Mmax_acao_permanente = (acaoPermanente * (L / 100) ** 2) / 8;
    var Mmax_acao_quase_permanente =
        (acaoQuasePermanente * (L / 100) ** 2) / 8;
    var Mmáx_acao_rara = (acaoRara * (L / 100) ** 2) / 8;
    console.log(
        `Mmax_acao_quase_permanente: ${Mmax_acao_quase_permanente}`
    );

    var MrMmax_acao_permanente = mr / Mmax_acao_permanente;
    var MrMmax_acao_quase_permanente = mr / Mmax_acao_quase_permanente;
    var MrMmax_acao_rara = mr / Mmáx_acao_rara;
    console.log(
        `MrMmax_acao_quase_permanente: ${MrMmax_acao_quase_permanente}`
    );

    var Im_acao_permanente =
        MrMmax_acao_permanente ** 3 * inercia +
        (1 - MrMmax_acao_permanente ** 3) * inercia2;
    var Im_acao_quase_permanente =
        MrMmax_acao_quase_permanente ** 3 * inercia +
        (1 - MrMmax_acao_quase_permanente ** 3) * inercia2;

    var Im_acao_rara =
        MrMmax_acao_rara ** 3 * inercia +
        (1 - MrMmax_acao_rara ** 3) * inercia2;
    console.log(`Im_acao_quase_permanente: ${Im_acao_quase_permanente}`);

    var pIM_acao_permanente = acaoPermanente / Im_acao_permanente;
    var pIM_acao_quase_permanente =
        acaoQuasePermanente / Im_acao_quase_permanente;
    var pIM_acao_rara = acaoRara / Im_acao_rara;
    console.log(`pIM_acao_quase_permanente: ${pIM_acao_quase_permanente}`);

    var a_acao_permanenteMetros =
        (pIM_acao_permanente * (L / 100) ** 4 * 5) / (384 * 2100000);
    var a_acao_quase_permanenteMetros =
        (pIM_acao_quase_permanente * (L / 100) ** 4 * 5) / (384 * 2100000);
    var a_acao_raraMetros =
        (pIM_acao_rara * (L / 100) ** 4 * 5) / (384 * 2100000);
    console.log(
        `a_acao_quase_permanenteMetros: ${a_acao_quase_permanenteMetros}`
    );

    var a_acao_permanenteCentimetro = a_acao_permanenteMetros * 100;
    var a_acao_quase_permanenteCentimetro =
        a_acao_quase_permanenteMetros * 100;
    var a_acao_raraCentimetro = a_acao_ra;
    console.log(
        `a_acao_permanenteCentimetro: ${a_acao_permanenteCentimetro} ,a_acao_quase_permanenteCentimetro: ${a_acao_quase_permanenteCentimetro} ,a_acao_raraCentimetro: ${a_acao_raraCentimetro}`
    );

    // var ai = a_acao_raraCentimetro - a_acao_permanenteCentimetro;

    var amax = L / 250;
    console.log('amax: ', amax);
    var plinha = As2 / (bw * d);
    console.log('plinha: ', plinha);
    var x = 0.47;
    // console.log("tensao de tracao: ", tensaoDeTracao);
    var e0 = 0.68 * 0.996 ** x * x ** 0.32;
    console.log('e0: ', e0);
    var einf = 2;
    // console.log("tensao de tracao: ", tensaoDeTracao);
    var af = (einf - e0) / (1 + 50 * plinha);
    console.log('af: ', af);
    var aflu = a_acao_quase_permanenteCentimetro * (1 + af);
    console.log('aflu: ', aflu);
}

/*
git add .
git commit -m "Definindo Mmáx_acao_permanente, Mmáx_acao_quase_permanente e Mmáx_acao_rara"
git push origin main
*/

// diametroAgregado = 1.2*2.5;
// var ahLista = [0.02 , bitolaUtilizada/10 , diametroAgregado];
// var ahMin = Math.max(ahLista);
// var ah = ((bw*100)-((2*cobrimento)+(2*bitolaEstribo)+(numeroBarras*bitolaUtilizada)))/(numeroBarras-1);
// console.log('ah',ah);
// ((0.12*100)-((2*2.5)+(2*.6)+(2*1)))/(2-1)
//calculo de ah (espaçamento vertical)
// // window.location.href = "result.html";
// // return false;