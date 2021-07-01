var fs = require('fs'),
    readline = require('readline');





var stage1 = [];
var stage2 = [];
var stage3 = [];
var stage4 = [];
var nodes = [];

var stagecount = 4;
go('data/stage1CS.csv', stage1);
go('data/stage2CS.csv', stage2);
go('data/stage3CS.csv', stage3);
go('data/stage4CS.csv', stage4);

function go(filename, stage) {
    var rd = readline.createInterface({
        input: fs.createReadStream(filename),
        output: process.stdout,
        console: false
    });



    rd.on('line', function (line) {
        console.log(line);
        var inline = line.split(',');
        console.log(line);
        var row = [];
        row.push(inline[0])
        if (nodes.indexOf(inline[0]) < 0) {
            nodes.push(inline[0]);
        }
        for (i = 1; i < inline.length; i++) {
            if (inline[i] != "") {
                //logger.write(inline[0] + "," + inline[i] + ",1\n");
                row.push(inline[i])
                if (nodes.indexOf(inline[i]) < 0) {
                    nodes.push(inline[i]);
                }
            }
        }
        stage.push(row);
    });


    rd.on('close', function () {
        stagecount--;
        if (stagecount == 0) {
            end();
        }
    });

}
//tage the raw csv and sorts into links and groups.
function end() {
    console.table(nodes);

    var logger = fs.createWriteStream('CStest.csv', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })

    for (i = 0; i < stage1.length; i++) {
        for (j = 1; j < stage1[i].length; j++) {
            logger.write(stage1[i][0] + "," + stage1[i][j] + ",1,"+stage1[i][0]+"\n");
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage2.length; i++) {
        for (j = 1; j < stage2[i].length; j++) {
            for (k = 1; k < stage1[i].length; k++) {
                logger.write(stage1[i][k] + "," + stage2[i][j] + ",1,"+stage2[i][0]+"\n");
            }
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage3.length; i++) {
        for (j = 1; j < stage3[i].length; j++) {
            for (k = 1; k < stage2[i].length; k++) {
                logger.write(stage2[i][k] + "," + stage3[i][j] + ",1,"+stage3[i][0]+"\n");
            }
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage4.length; i++) {
        for (j = 1; j < stage4[i].length; j++) {
            for (k = 1; k < stage3[i].length; k++) {
                logger.write(stage3[i][k] + "," + stage4[i][j] + ",1,"+stage4[i][0]+"\n");
            }
        }
        //row.push(inline[i]) 
    }


    logger.end();
}
var allLinks = [];
function endAllu() {
    //console.table(nodes);

    var logger = fs.createWriteStream('CStest.csv', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })

    for (i = 0; i < stage1.length; i++) {
        for (j = 1; j < stage1[i].length; j++) {
            allLinks.push([stage1[i][0], stage1[i][j]])
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage2.length; i++) {
        for (j = 1; j < stage2[i].length; j++) {
            for (k = 1; k < stage1[i].length; k++) {
                allLinks.push([stage1[i][k], stage2[i][j]])
                //logger.write(stage1[i][k] + "," + stage2[i][j] + ",1\n");
            }
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage3.length; i++) {
        for (j = 1; j < stage3[i].length; j++) {
            for (k = 1; k < stage2[i].length; k++) {
                allLinks.push([stage2[i][k], stage3[i][j]])
                //logger.write(stage2[i][k] + "," + stage3[i][j] + ",1\n");
            }
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage4.length; i++) {
        for (j = 1; j < stage4[i].length; j++) {
            for (k = 1; k < stage3[i].length; k++) {
                allLinks.push([stage3[i][k], stage4[i][j]])
                //logger.write(stage3[i][k] + "," + stage4[i][j] + ",1\n");
            }
        }
        //row.push(inline[i]) 
    }

    var finaLinks = [];
    var count=0;
    finaLinks.push([allLinks[0][0],allLinks[0][1]]);
    for (i = 0; i < allLinks.length; i++) {
        var add = true;
        for (j = 0; j < finaLinks.length; j++) {
            var rowlength = finaLinks[j].length-1;
            if(allLinks[i][0]==finaLinks[j][rowlength]){
                add = false;
                //finaLinks[j].push(allLinks[i][0]);
                finaLinks[j].push(allLinks[i][1]);
            }

        }

        if (add) {
            count ++;
            finaLinks.push([allLinks[count][0],allLinks[count][1]]);
        }

    }

    console.table(allLinks);
    console.table(finaLinks);
}

function end3() {
    console.table(nodes);

    var logger = fs.createWriteStream('log2.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })

    for (i = 0; i < stage1.length; i++) {
        for (j = 1; j < stage1[i].length; j++) {
            logger.write(stage1[i][0] + "," + stage1[i][j] + ",1\n");
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage2.length; i++) {
        for (j = 1; j < stage2[i].length; j++) {
            logger.write(stage2[i][0] + "," + stage2[i][j] + ",1\n");
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage3.length; i++) {
        for (j = 1; j < stage3[i].length; j++) {
            logger.write(stage3[i][0] + "," + stage3[i][j] + ",1\n");
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage4.length; i++) {
        for (j = 1; j < stage4[i].length; j++) {
            logger.write(stage4[i][0] + "," + stage4[i][j] + ",1\n");
        }
        //row.push(inline[i]) 
    }




    logger.end();
}




function end2() {

    var logger = fs.createWriteStream('log.json', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })

    logger.write("{\n");
    logger.write('"nodes":[\n');


    for (i = 0; i < nodes.length; i++) {
        logger.write('{"name":"' + nodes[i] + '",' + '"id":"' + i + '"},' + '\n');

    }

    logger.write('],\n');
    logger.write('"links":[\n');



    for (i = 0; i < stage1.length; i++) {
        for (j = 1; j < stage1[i].length; j++) {

            logger.write('{"source":"' + nodes.indexOf(stage1[i][0]) + '",' + '"target":"' + nodes.indexOf(stage1[i][j]) + '","value":"1" },' + '\n');
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage2.length; i++) {
        for (j = 1; j < stage2[i].length; j++) {
            for (k = 1; k < stage1[i].length; k++) {

                //logger.write(stage1[i][k] + "," + stage2[i][j] + ",1\n");

                logger.write('{"source":"' + nodes.indexOf(stage1[i][k]) + '",' + '"target":"' + nodes.indexOf(stage2[i][j]) + '","value":"1" },' + '\n');
            }
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage3.length; i++) {
        for (j = 1; j < stage3[i].length; j++) {
            for (k = 1; k < stage2[i].length; k++) {
                //logger.write(stage2[i][k] + "," + stage3[i][j] + ",1\n");

                logger.write('{"source":"' + nodes.indexOf(stage2[i][k]) + '",' + '"target":"' + nodes.indexOf(stage3[i][j]) + '","value":"1" },' + '\n');
            }
        }
        //row.push(inline[i]) 
    }
    for (i = 0; i < stage4.length; i++) {
        for (j = 1; j < stage4[i].length; j++) {
            for (k = 1; k < stage3[i].length; k++) {
                //logger.write(stage3[i][k] + "," + stage4[i][j] + ",1\n");

                logger.write('{"source":"' + nodes.indexOf(stage3[i][k]) + '",' + '"target":"' + nodes.indexOf(stage4[i][j]) + '","value":"1" },' + '\n');
            }
        }
        //row.push(inline[i]) 
    }

    logger.write("]\n");
    logger.write("}\n");
    logger.end();
}














