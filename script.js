/*var rows=3;
var columns=3;
document.getElementById("fileUploadID").onchange = function() {
var table = document.getElementById('matrix');
var newrow = table.insertRow(rows);
var newcol = table.insertCell(columns);
var newtext = document.createTextNode(rows);
newcol.appendChild(newtext);
    
}*/



var table = {
    row: 3,
    column: 3,
    changeSize: function(row,column){
        this.row = row;
        this.column = column;
    }
}
 
    function createTable(){
        var tablo = $('<table>').addClass('foo');
        document.getElementById('matrix').innerHTML="";
        var output = document.getElementById('matrix');
        var row = document.getElementById('row').value;
        if(row==""){
            row = 3;
        }
        var col = document.getElementById('column').value;
        if(col==""){
            col= 3;
        }
        console.log(row);
        row++;
        row++;
        col++;
        console.log(row);
        table.changeSize(row,col);
        $(function(){
        for(i=0; i<table.row; i++){
            var satir = $('<tr>').addClass('bar');
            //var sutun = $('<td>').addClass('coll');
            if(i==0){}
            else {
                if(!document.getElementById('timedrpact'+i)){
                    var sutun = document.createElement("th");
                    sutun.setAttribute("id","timedrpact"+i);
                    sutun.setAttribute("class","arzNumber");
                    if(i==table.row-1){
                        sutun.innerHTML = "TALEP";
                    }else{
                        sutun.innerHTML = "A"+i;
                    }
                    //output.appendChild(arz);
                    //sutun.append(arz);
                    satir.append(sutun);
                }
            }
            
            
            for(j=0; j<table.column; j++){
                if(i==0 && j==0){
                    var sutunbos = document.createElement("th");
                    sutunbos.append("");
                    var sutunbos2 = document.createElement("th");
                    sutunbos2.append("T1");
                    satir.append(sutunbos);
                    satir.append(sutunbos2);
                    continue;
                }
                else if(i==0 && j>0){
                    if(!document.getElementById('timedrpact'+i)){
                        var sutun1 = document.createElement("th");
                        sutun1.setAttribute("id","timedrpact"+i);
                        sutun1.setAttribute("class","arzNumber");
                        if(j==table.column-1){
                           sutun1.innerHTML = "ARZ";
                        }else{
                           sutun1.innerHTML = "T"+(j+1);
                        }
                        //output.appendChild(arz);
                        //sutun.append(arz);
                        satir.append(sutun1);
                    }
                    continue;
                    
                }
                var deger = $('<td>').addClass('bar');
                
                if(i==table.row-1 && j==table.column-1){}
                else{
                    if(!document.getElementById('timedrpact'+i)){
                        var giris = document.createElement("input");
                        giris.setAttribute("id","box");
                        giris.setAttribute("type","text");
                        giris.setAttribute("name","box");
                        deger.append(giris);
                        satir.append(deger);
                    }
                }
                    /*$('<input>').attr({
                        type: 'text',
                        id: 'box',
                        name: 'box'
                    }).append('.coll');*/
                
                
            }
            
            //$('<br/>').appendTo('#matrix');
            satir.prepend(sutun);
            tablo.append(satir);
        }
        $('#matrix').prepend(tablo);
        });
    }
    
    
//hazırda çalışan
$(function(){
    createTable();
    
    $("#get").click(function(){
        //console.log("selam");
        //console.log(getMatrix());
        var matrix = getMatrix();
        //console.log(matrix);
        var deneme = kuzeyBati(matrix);
        console.log(deneme);
    });
});


    function kuzeyBati(matrix){
        //[0....][table.column-1] -> arz
        //[table.row-2][0....] -> talep
        var toplamM=0;
        var islemSayisi = table.row + table.column - 4;
        console.log(islemSayisi);
        var i=0, j=0;
        var talep,arz;
        
        //bulunan maliyetler
        var cV = new Array(table.row-2);
        for(i=0;i<table.row-2;i++)
            cV[i] = new Array(table.column-1);
        
        //hesaplanmış hücreler
        var c = new Array(table.row-2);
        for(i=0;i<table.row-2;i++)
            c[i] = new Array(table.column-1);
        
        for(i=0;i<table.row-2;i++){
            for(j=0;j<table.column-1;j++){
                cV[i][j]=-1;
                c[i][j]=-1;
            }
            
        }
        
        
        i=0;
        j=0;
        
        
        for(var m=0;m<islemSayisi;m++){
            var mEle = matrix[i][j];
            arz = matrix[i][table.column-1];
            talep = matrix[table.row-2][j]; 
            if(talep>arz){
                cV[i][j]=arz;
                c[i][j] = matrix[i][j];
                toplamM += mEle*arz;
                matrix[table.row-2][j]=talep-arz;
                console.log((table.row-2) + " " + j + "talep:" + matrix[table.row-2][j]);
                matrix[i][table.column-1]=0;
                i++;
            }else if(arz>talep){
                cV[i][j]=talep;
                c[i][j] = matrix[i][j];
                toplamM += mEle*talep;
                matrix[i][table.column-1]=arz-talep;
                console.log(i + " " + (table.column-1) + "talep:" + matrix[i][table.column-1]);
                matrix[table.row-2][j]=0;
                j++;
            }else if(arz == talep){
                cV[i][j]=talep;
                c[i][j] = matrix[i][j];
                toplamM += mEle*talep;
                matrix[i][table.column-1]=0;
                matrix[table.row-2][j]=0;
                i++;
                j++;
            }
            
        }
        
        console.log(cV);
        console.log(c);
        
        var lengthI = table.row-2;
        var lengthJ = table.column-1;
    
        
        var tum = new Array(table.row-2);
        for(i=0;i<table.row-2;i++)
            tum[i] = new Array(table.column-1);
        
        for(i=0;i<table.row-2;i++){
            for(j=0;j<table.column-1;j++){
                tum[i][j]=matrix[i][j];
                console.log(tum[i][j]);
            }
            
        }
        
        
        
        //console.log(islemSayisi);
        //return matrix[table.row-2][0];
        
        modi(tum, c, cV, lengthI, lengthJ);
        
        return toplamM;
    }

    function modi(tum,c,cV,lengthI,lengthJ){
        var i,j;
        var r1, r2, r3, r4, c1, c2, c3, c4;
        var work = false;
        var minLoop;
        var optimumM = 0;
        
        var yedekC = new Array(lengthI);
        for(i=0;i<lengthI;i++)
            yedekC[i] = new Array(lengthJ);
        
        var d = new Array(lengthI);
        for(i=0;i<lengthI;i++)
            d[i] = new Array(lengthJ);
        
        for(i=0;i<lengthI;i++){
            for(j=0;j<lengthJ;j++){
                yedekC[i][j] = -1;
                d[i][j] = -1;
            }
        }
        
        var u = new Array(lengthI);
        var v = new Array(lengthJ);
        for(i=0;i<lengthI;i++)
            u[i] = -1;
        for(i=0;i<lengthJ;i++)
            v[i] = -1;
        
        var loop = new Array(2);
        for(i=0;i<2;i++)
            loop[i] = new Array(2);
        
        for(i=0;i<2;i++){
            for(j=0;j<2;j++){
                loop[i][j] = -1;
            }
        }
        
        var m = 0;
        var kucuk;
        
        var min = 0;
        var minI, minJ;
        
        u[0] = 0; //const
        
        // 1.aşama u ve v değerleri bulundu
        for(i=0;i<lengthI;i++){
            for(j=0;j<lengthJ;j++){
                if(c[i][j] != -1){
                    if(u[i]!=-1 && v[j]==-1){
                        v[j] = c[i][j] - u[i];
                        console.log("v[" + j +"] = " + v[j]);
                    }
                    else if(u[i]==-1 && v[j]!=-1){
                        u[i] = c[i][j] - v[j];
                        console.log("u[" + i +"] = " + u[i]);
                    }
                }
            }
        }
        
        // 2.aşama hesaplanmamış bölgelerin d[i][j] değerleri bulunur.
        
        for(i=0;i<lengthI;i++){
            for(j=0;j<lengthJ;j++){
                if(c[i][j] == -1){
                    d[i][j] = tum[i][j] - (u[i]+v[j]);
                    if(min > d[i][j]){
                        min = d[i][j];
                        minI = i;
                        minJ = j;
                    }
                    console.log("d["+i+"]["+j+"]="+d[i][j]);
                }
            }
        }
        
        // 3.aşama negatif olarak en düşük dij değerine göre optimumluk sorgulanır
        
        if(min>=0){
            console.log("optimumdur.");
            for(i=0;i<lengthI;i++){
                for(j=0;j<lengthJ;j++){
                    if(c[i][j] != -1){
                        optimumM += c[i][j]*cV[i][j];
                    }
                }
            }
            console.log("optimum sonuç -> " + optimumM);
            
            
        }else{
            var satir, sutun;
            var temp;
            satir = minI;
            sutun = minJ;
            c[minI][minJ] = tum[minI][minJ];
            
            loop[0][0] = 0;
            var r = 0;
            
            console.log("sutun uzunluğu - > "+lengthJ);
            console.log("minj - > " + minJ);
            
            console.log("satir uzunluğu - > "+lengthI);
            console.log("minI - > " + minI);
            if (minI == 0 && minJ!=0 && minJ !=lengthJ-1) {//( sola ve aşağı gidebilir) , sağa gidemez, yukarı gidemez
                console.log("sağ ve sola gidebilir");
                var yon = "sol";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minJ;
                
                while(m < 2){
                    if(yon=="sol"){
                        while(1){
                            j--;
                            if(j<0){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "asagi";
                                break;
                            }
                        }
                    }
                    if(yon=="asagi"){
                        while(1){
                            i++;
                            if(i>lengthI-1){
                                yon = "sol";
                                i = satir;
                                j = temp--;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "sag";
                                break;
                            }
                        }
                    }
                    if(yon=="sag"){
                       while(1){
                           j++;
                           if(j>lengthJ-1){
                               yon = "sol";
                               i = satir;
                               j = temp--;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&j==sutun){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               work=true;
                               break;
                           }
                       } 
                    }
                }
                m=0;
                if(!work){
                    var yon = "asagi";
                    var i = minI;
                    var j = minJ;
                    r1 = i;
                    c1 = j;
                    temp = minI;

                    while(m < 2){
                        if(yon=="asagi"){
                            while(1){
                                i++;
                                if(i>lengthI-1){
                                    m=3;
                                    break;
                                }
                                else if(c[i][j] != -1){
                                    loop[0][1] = cV[i][j];
                                    r2 = i;
                                    c2 = j;
                                    minLoop = loop[0][1];
                                    m++;
                                    yon = "sag";
                                    break;
                                }
                            }
                        }
                        if(yon=="sag"){
                            while(1){
                                j++;
                                if(j>lengthJ-1){
                                    yon = "asagi";
                                    i = temp++;
                                    j = sutun;
                                    m = 0;
                                    break;
                                }else if(c[i][j] != -1){
                                    loop[1][0] = cV[i][j];
                                    r3 = i;
                                    c3 = j;
                                    m++;
                                    yon = "yukari";
                                    break;
                                }
                            }
                        }
                        if(yon=="yukari"){
                           while(1){
                               i--;
                               if(i<0){
                                   yon = "asagi";
                                   i = temp++;
                                   j = sutun;
                                   m = 0;
                                   break;
                               }else if(c[i][j]!=-1&&i==satir){
                                   loop[1][1] = cV[i][j];
                                   r4 = i;
                                   c4 = j;
                                   if(minLoop > loop[1][1])
                                       minLoop = loop[1][1];
                                   m++;
                                   break;
                               }
                           } 
                        }
                    }
                }
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
			}
            else if(minI == 0 && minJ == lengthJ-1){// sadece sola gidebilir.
                console.log("sadece sola gidebilir");
                var yon = "sol";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minJ;
                
                while(m < 2){
                    if(yon=="sol"){
                        while(1){
                            j--;
                            if(j<0){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "asagi";
                                break;
                            }
                        }
                    }
                    if(yon=="asagi"){
                        while(1){
                            i++;
                            if(i>lengthI-1){
                                yon = "sol";
                                i = satir;
                                j = temp--;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "sag";
                                break;
                            }
                        }
                    }
                    if(yon=="sag"){
                       while(1){
                           j++;
                           if(j>lengthJ-1){
                               yon = "sol";
                               i = satir;
                               j = temp--;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&j==sutun){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               break;
                           }
                       } 
                    }
                }
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
                
            }
            else if(minI == 0 && minJ==0){ // sadece aşağı gidebilir
                console.log("sadece asagi gidebilir");
                var yon = "asagi";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minI;
                
                while(m < 2){
                    if(yon=="asagi"){
                        while(1){
                            i++;
                            if(i>lengthI-1){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "sag";
                                break;
                            }
                        }
                    }
                    if(yon=="sag"){
                        while(1){
                            j++;
                            if(j>lengthJ-1){
                                yon = "asagi";
                                i = temp++;
                                j = sutun;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "yukari";
                                break;
                            }
                        }
                    }
                    if(yon=="yukari"){
                       while(1){
                           i--;
                           if(i<0){
                               yon = "asagi";
                               i = temp++;
                               j = sutun;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&i==satir){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               break;
                           }
                       } 
                    }
                }
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
            }
            else if(minJ == 0 && minI!= 0 && minI!=lengthI-1){//yukarı gidemez, (aşağı - sağa gidebilir), sola gidemez
                console.log("asagi ve saga gidebilir");
                var yon = "asagi";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minI;
                
                while(m < 2){
                    if(yon=="asagi"){
                        while(1){
                            i++;
                            if(i>lengthI-1){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "sag";
                                break;
                            }
                        }
                    }
                    if(yon=="sag"){
                        while(1){
                            j++;
                            if(j>lengthJ-1){
                                yon = "asagi";
                                i = temp++;
                                j = sutun;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "yukari";
                                break;
                            }
                        }
                    }
                    if(yon=="yukari"){
                       while(1){
                           i--;
                           if(i<0){
                               yon = "asagi";
                               i = temp++;
                               j = sutun;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&i==satir){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               work=true;
                               break;
                           }
                       } 
                    }
                }
                m=0;
                if(!work){
                    var yon = "sag";
                    var i = minI;
                    var j = minJ;
                    r1 = i;
                    c1 = j;
                    temp = minJ;

                    while(m < 2){
                        if(yon=="sag"){
                            while(1){
                                j++;
                                if(j>lengthJ-1){
                                    m=3;
                                    break;
                                }
                                else if(c[i][j] != -1){
                                    loop[0][1] = cV[i][j];
                                    r2 = i;
                                    c2 = j;
                                    minLoop = loop[0][1];
                                    m++;
                                    yon = "yukari";
                                    break;
                                }
                            }
                        }
                        if(yon=="yukari"){
                            while(1){
                                i--;
                                if(i<0){
                                    yon = "sag";
                                    i = satir;
                                    j = temp++;
                                    m = 0;
                                    break;
                                }else if(c[i][j] != -1){
                                    loop[1][0] = cV[i][j];
                                    r3 = i;
                                    c3 = j;
                                    m++;
                                    yon = "sol";
                                    break;
                                }
                            }
                        }
                        if(yon=="sol"){
                           while(1){
                               j--;
                               if(j<0){
                                   yon = "sag";
                                   i = satir;
                                   j = temp++;
                                   m = 0;
                                   break;
                               }else if(c[i][j]!=-1&&j==sutun){
                                   loop[1][1] = cV[i][j];
                                   r4 = i;
                                   c4 = j;
                                   if(minLoop > loop[1][1])
                                       minLoop = loop[1][1];
                                   m++;
                                   break;
                               }
                           } 
                        }
                    }
                }
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
            }
            else if(minI!=0 && minI!=lengthI-1 && minJ != 0 && minJ != lengthJ-1){//(sola-yukarı-aşağı-sağa gidebilir)
                console.log("sola-yukari-asagi-saga gidebilir");
                var yon = "sol";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minJ;
                
                while(m < 2){
                    if(yon=="sol"){
                        while(1){
                            j--;
                            if(j<0){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "asagi";
                                break;
                            }
                        }
                    }
                    if(yon=="asagi"){
                        while(1){
                            i++;
                            if(i>lengthI-1){
                                yon = "sol";
                                i = satir;
                                j = temp--;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "sag";
                                break;
                            }
                        }
                    }
                    if(yon=="sag"){
                       while(1){
                           j++;
                           if(j>lengthJ-1){
                               yon = "sol";
                               i = satir;
                               j = temp--;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&j==sutun){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               work=true;
                               break;
                           }
                       } 
                    }
                }
                m=0;
                if(!work){
                    var yon = "yukari";
                    var i = minI;
                    var j = minJ;
                    r1 = i;
                    c1 = j;
                    temp = minI;

                    while(m < 2){
                        if(yon=="yukari"){
                            while(1){
                                i--;
                                if(i<0){
                                    m=3;
                                    break;
                                }
                                else if(c[i][j] != -1){
                                    loop[0][1] = cV[i][j];
                                    r2 = i;
                                    c2 = j;
                                    minLoop = loop[0][1];
                                    m++;
                                    yon = "sol";
                                    break;
                                }
                            }
                        }
                        if(yon=="sol"){
                            while(1){
                                j--;
                                if(j<0){
                                    yon = "yukari";
                                    i = temp--;
                                    j = sutun;
                                    m = 0;
                                    break;
                                }else if(c[i][j] != -1){
                                    loop[1][0] = cV[i][j];
                                    r3 = i;
                                    c3 = j;
                                    m++;
                                    yon = "asagi";
                                    break;
                                }
                            }
                        }
                        if(yon=="asagi"){
                           while(1){
                               i++;
                               if(i>lengthI-1){
                                   yon = "yukari";
                                   i = temp--;
                                   j = sutun;
                                   m = 0;
                                   break;
                               }else if(c[i][j]!=-1&&i==satir){
                                   loop[1][1] = cV[i][j];
                                   r4 = i;
                                   c4 = j;
                                   if(minLoop > loop[1][1])
                                       minLoop = loop[1][1];
                                   m++;
                                   work=true;
                                   break;
                               }
                           } 
                        }
                    }
                }
                m=0;
                if(!work){
                    var yon = "asagi";
                    var i = minI;
                    var j = minJ;
                    r1 = i;
                    c1 = j;
                    temp = minI;

                    while(m < 2){
                        if(yon=="asagi"){
                            while(1){
                                i++;
                                if(i>lengthI-1){
                                    m=3;
                                    break;
                                }
                                else if(c[i][j] != -1){
                                    loop[0][1] = cV[i][j];
                                    r2 = i;
                                    c2 = j;
                                    minLoop = loop[0][1];
                                    m++;
                                    yon = "sag";
                                    break;
                                }
                            }
                        }
                        if(yon=="sag"){
                            while(1){
                                j++;
                                if(j>lengthJ-1){
                                    yon = "asagi";
                                    i = temp++;
                                    j = sutun;
                                    m = 0;
                                    break;
                                }else if(c[i][j] != -1){
                                    loop[1][0] = cV[i][j];
                                    r3 = i;
                                    c3 = j;
                                    m++;
                                    yon = "yukari";
                                    break;
                                }
                            }
                        }
                        if(yon=="yukari"){
                           while(1){
                               i--;
                               if(i<0){
                                   yon = "asagi";
                                   i = temp++;
                                   j = sutun;
                                   m = 0;
                                   break;
                               }else if(c[i][j]!=-1&&i==satir){
                                   loop[1][1] = cV[i][j];
                                   r4 = i;
                                   c4 = j;
                                   if(minLoop > loop[1][1])
                                       minLoop = loop[1][1];
                                   m++;
                                   work=true;
                                   break;
                               }
                           } 
                        }
                    }
                }
                m=0;
                if(!work){
                    var yon = "sag";
                    var i = minI;
                    var j = minJ;
                    r1 = i;
                    c1 = j;
                    temp = minJ;

                    while(m < 2){
                        if(yon=="sag"){
                            while(1){
                                j++;
                                if(j>lengthJ-1){
                                    m=3;
                                    break;
                                }
                                else if(c[i][j] != -1){
                                    loop[0][1] = cV[i][j];
                                    r2 = i;
                                    c2 = j;
                                    minLoop = loop[0][1];
                                    m++;
                                    yon = "yukari";
                                    break;
                                }
                            }
                        }
                        if(yon=="yukari"){
                            while(1){
                                i--;
                                if(i<0){
                                    yon = "sag";
                                    i = satir;
                                    j = temp++;
                                    m = 0;
                                    break;
                                }else if(c[i][j] != -1){
                                    loop[1][0] = cV[i][j];
                                    r3 = i;
                                    c3 = j;
                                    m++;
                                    yon = "sol";
                                    break;
                                }
                            }
                        }
                        if(yon=="sol"){
                           while(1){
                               j--;
                               if(j<0){
                                   yon = "sag";
                                   i = satir;
                                   j = temp++;
                                   m = 0;
                                   break;
                               }else if(c[i][j]!=-1&&j==sutun){
                                   loop[1][1] = cV[i][j];
                                   r4 = i;
                                   c4 = j;
                                   if(minLoop > loop[1][1])
                                       minLoop = loop[1][1];
                                   m++;
                                   break;
                               }
                           } 
                        }
                    }
                }
                
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
                
            }
            else if(minI!=0 && minI!=lengthI-1 && minJ==lengthJ-1){//(yukarı-sola gidebilir)
                console.log("sadece yukari gidebilir");
                var yon = "yukari";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minI;
                
                while(m < 2){
                    if(yon=="yukari"){
                        while(1){
                            i--;
                            if(i<0){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "sol";
                                break;
                            }
                        }
                    }
                    if(yon=="sol"){
                        while(1){
                            j--;
                            if(j<0){
                                yon = "yukari";
                                i = temp--;
                                j = sutun;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "asagi";
                                break;
                            }
                        }
                    }
                    if(yon=="asagi"){
                       while(1){
                           i++;
                           if(i>lengthI-1){
                               yon = "yukari";
                               i = temp--;
                               j = sutun;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&i==satir){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               work=true;
                               break;
                           }
                       } 
                    }
                }
                m=0;
                if(!work){
                    var yon = "sol";
                    var i = minI;
                    var j = minJ;
                    r1 = i;
                    c1 = j;
                    temp = minJ;

                    while(m < 2){
                        if(yon=="sol"){
                            while(1){
                                j--;
                                if(j<0){
                                    m=3;
                                    break;
                                }
                                else if(c[i][j] != -1){
                                    loop[0][1] = cV[i][j];
                                    r2 = i;
                                    c2 = j;
                                    minLoop = loop[0][1];
                                    m++;
                                    yon = "asagi";
                                    break;
                                }
                            }
                        }
                        if(yon=="asagi"){
                            while(1){
                                i++;
                                if(i>lengthI-1){
                                    yon = "sol";
                                    i = satir;
                                    j = temp--;
                                    m = 0;
                                    break;
                                }else if(c[i][j] != -1){
                                    loop[1][0] = cV[i][j];
                                    r3 = i;
                                    c3 = j;
                                    m++;
                                    yon = "sag";
                                    break;
                                }
                            }
                        }
                        if(yon=="sag"){
                           while(1){
                               j++;
                               if(j>lengthJ-1){
                                   yon = "sol";
                                   i = satir;
                                   j = temp--;
                                   m = 0;
                                   break;
                               }else if(c[i][j]!=-1&&j==sutun){
                                   loop[1][1] = cV[i][j];
                                   r4 = i;
                                   c4 = j;
                                   if(minLoop > loop[1][1])
                                       minLoop = loop[1][1];
                                   m++;
                                   break;
                               }
                           } 
                        }
                    }
                }
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
            }
            else if(minI == lengthI-1 && minJ == 0){// (sağa gidebilir)
                console.log("sadece sağa gidebilir");
                var yon = "sag";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minJ;
                
                while(m < 2){
                    if(yon=="sag"){
                        while(1){
                            j++;
                            if(j>lengthJ-1){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "yukari";
                                break;
                            }
                        }
                    }
                    if(yon=="yukari"){
                        while(1){
                            i--;
                            if(i<0){
                                yon = "sag";
                                i = satir;
                                j = temp++;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "sol";
                                break;
                            }
                        }
                    }
                    if(yon=="sol"){
                       while(1){
                           j--;
                           if(j<0){
                               yon = "sag";
                               i = satir;
                               j = temp++;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&j==sutun){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               break;
                           }
                       } 
                    }
                }
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
            }
            else if(minI == lengthI-1 && minJ!=0 && minJ!=lengthJ-1){//(yukarı-sağa gidebilir)
                console.log("saga ve yukarı gidebilir");
                var yon = "sag";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minJ;
                
                while(m < 2){
                    if(yon=="sag"){
                        while(1){
                            j++;
                            if(j>lengthJ-1){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "yukari";
                                break;
                            }
                        }
                    }
                    if(yon=="yukari"){
                        while(1){
                            i--;
                            if(i<0){
                                yon = "sag";
                                i = satir;
                                j = temp++;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "sol";
                                break;
                            }
                        }
                    }
                    if(yon=="sol"){
                       while(1){
                           j--;
                           if(j<0){
                               yon = "sag";
                               i = satir;
                               j = temp++;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&j==sutun){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               work=true;
                               break;
                           }
                       } 
                    }
                }
                m=0;
                if(!work){
                    console.log("sadece yukari gidebilir");
                    var yon = "yukari";
                    var i = minI;
                    var j = minJ;
                    r1 = i;
                    c1 = j;
                    temp = minI;

                    while(m < 2){
                        if(yon=="yukari"){
                            while(1){
                                i--;
                                if(i<0){
                                    m=3;
                                    break;
                                }
                                else if(c[i][j] != -1){
                                    loop[0][1] = cV[i][j];
                                    r2 = i;
                                    c2 = j;
                                    minLoop = loop[0][1];
                                    m++;
                                    yon = "sol";
                                    break;
                                }
                            }
                        }
                        if(yon=="sol"){
                            while(1){
                                j--;
                                if(j<0){
                                    yon = "yukari";
                                    i = temp--;
                                    j = sutun;
                                    m = 0;
                                    break;
                                }else if(c[i][j] != -1){
                                    loop[1][0] = cV[i][j];
                                    r3 = i;
                                    c3 = j;
                                    m++;
                                    yon = "asagi";
                                    break;
                                }
                            }
                        }
                        if(yon=="asagi"){
                           while(1){
                               i++;
                               if(i>lengthI-1){
                                   yon = "yukari";
                                   i = temp--;
                                   j = sutun;
                                   m = 0;
                                   break;
                               }else if(c[i][j]!=-1&&i==satir){
                                   loop[1][1] = cV[i][j];
                                   r4 = i;
                                   c4 = j;
                                   if(minLoop > loop[1][1])
                                       minLoop = loop[1][1];
                                   m++;
                                   break;
                               }
                           } 
                        }
                    }
                    for(i=0;i<2;i++){
                        for(j=0;j<2;j++){
                            console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                        }
                    }
                }
                
            }
            else if(minI==lengthI-1 && minJ==lengthJ-1){// yukarı gidebilir
                console.log("sadece yukari gidebilir");
                var yon = "yukari";
                var i = minI;
                var j = minJ;
                r1 = i;
                c1 = j;
                temp = minI;
                
                while(m < 2){
                    if(yon=="yukari"){
                        while(1){
                            i--;
                            if(i<0){
                                m=3;
                                break;
                            }
                            else if(c[i][j] != -1){
                                loop[0][1] = cV[i][j];
                                r2 = i;
                                c2 = j;
                                minLoop = loop[0][1];
                                m++;
                                yon = "sol";
                                break;
                            }
                        }
                    }
                    if(yon=="sol"){
                        while(1){
                            j--;
                            if(j<0){
                                yon = "yukari";
                                i = temp--;
                                j = sutun;
                                m = 0;
                                break;
                            }else if(c[i][j] != -1){
                                loop[1][0] = cV[i][j];
                                r3 = i;
                                c3 = j;
                                m++;
                                yon = "asagi";
                                break;
                            }
                        }
                    }
                    if(yon=="asagi"){
                       while(1){
                           i++;
                           if(i>lengthI-1){
                               yon = "yukari";
                               i = temp--;
                               j = sutun;
                               m = 0;
                               break;
                           }else if(c[i][j]!=-1&&i==satir){
                               loop[1][1] = cV[i][j];
                               r4 = i;
                               c4 = j;
                               if(minLoop > loop[1][1])
                                   minLoop = loop[1][1];
                               m++;
                               break;
                           }
                       } 
                    }
                }
                for(i=0;i<2;i++){
                    for(j=0;j<2;j++){
                        console.log("loop[" + i + "][" + j + "]=" + loop[i][j]);
                    }
                }
            }
            
            
            loop[0][0] += minLoop;
            loop[0][1] -= minLoop;
			loop[1][0] += minLoop;
			loop[1][1] -= minLoop;
			if (loop[0][1] > loop[1][1]) {
				loop[1][1] = -1;
				c[r4][c4] = -1;
				c[r1][c1] = tum[r1][c1];
				c[r2][c2] = tum[r2][c2];
				c[r3][c3] = tum[r3][c3];
			}
			else {
				loop[0][1] = -1;
				c[r2][c2] = -1;
				c[r1][c1] = tum[r1][c1];
				c[r3][c3] = tum[r3][c3];
				c[r4][c4] = tum[r4][c4];
			}
			cV[r1][c1] = loop[0][0];
			cV[r2][c2] = loop[0][1];
			cV[r3][c3] = loop[1][0];
			cV[r4][c4] = loop[1][1];
            
            for (i = 0; i < lengthI; i++) {
				for (j = 0; j < lengthJ; j++) {
					console.log("cV[" + i + "][" + j + "]=" + cV[i][j]);
				}
			}
			
			for (i = 0; i < lengthI; i++) {
				for (j = 0; j < lengthJ; j++) {
					console.log("c[" + i + "][" + j + "]=" + c[i][j]);
				}
			}
            modi(tum,c,cV,lengthI,lengthJ);
        }
        
        
        
    }

    function getMatrix(){
        var r1 = 0, c1 = 0;
        var i = 0;
        var j = 1;
        var veri = [];
        $("#matrix table tr td").contents().each(function(i,e){
           if(this.nodeName == "INPUT"){
               c1++;
               veri[i]= $(this).val();
               i++;    
           } 
           else {
               //satır sayısı elde edilir.
               r1++;
           }
        });
        //sütun sayısı elde edilir
        r1 = table.row;
        c1 = table.column;
        console.log("sütun sayısı:" + c1);
        console.log("satır sayısı:" + r1);
        
        //iki boyutlu dizi
        var matrixArray = new Array(r1-1);
        for(i=0;i<r1-1;i++)
            matrixArray[i] = new Array(c1);
        i=0;
        m=0;
        for(i=0;i<r1-1;i++){
            for(j=0;j<c1;j++){
                matrixArray[i][j]=parseInt(veri[m]);
                m++;
            }
            
        }
        
        
        
        return matrixArray;
    } 
