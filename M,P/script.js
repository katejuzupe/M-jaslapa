
        const mansZimejums = document.getElementById("mansZimejums");
        const ctx = mansZimejums.getContext("2d");

        let brush_x = 0;
        let brush_y = 0;
        const brushWidth = 50;
        const brushHeight = 50;

        let color_x = 0;
        let color_y = 0;
        const colorWidth = 20;
        const colorHeight = 20;

        let punktuSkaits = 0;
        // izveido mainīgo, laika skaitīšanai
        let taimeris = 30;
        let apturSpeli;

        const brushAtt = new Image();
        brushAtt.src = "brush.png";

        const colorAtt = new Image();
        colorAtt.src = "color.png";

        // izveido funkciju divu zīmējumu saskarei, divi attēlu mainīgie ar x un y
        function atteluSaskare(x1, y1, brushWidth, brushHeight, x2, y2, colorWidth, colorHeight) {
            // pārāk tālu uz sāniem viens objekts no otra
            if (x1 >= x2 + colorWidth || x1 + brushWidth <= x2) return false;
            // pārāk zemu vai augstu viens objekts no otra, nesaskaras 
            if (y1 >= y2 + colorHeight || y1 + brushHeight <= y2) return false;
            //   ja neizpildās iepriekšminētie nosacījumi nav patiesi,tad
            return true;
        }

        function MyKeyDownHandler(MyEvent) {
            if (MyEvent.keyCode == 37 && brush_x > 0) {
                brush_x = brush_x - 10;
            }
            if (MyEvent.keyCode == 39 && brush_x + brushWidth < mansZimejums.width) {
                brush_x = brush_x + 10;
            }
        }

        addEventListener("keydown", MyKeyDownHandler);

        function Laukums() {
            // notīra zīmēšanas laukumu
            ctx.clearRect(0, 0, mansZimejums.width, mansZimejums.height);
            // tūlīt pēc canvas notīrīšanas ievieto score uzrakstu ar stilu
            ctx.fillStyle = "green";
            ctx.font = "15px Arial";
            ctx.fillText("Punktu skaits: " + punktuSkaits, 0, 20);
            // ievieto taimera uzrakstu ar tādu pašu stilu kā punktu skaita uzrakstu tikai citām y koordinātām, izmantojot metodi, kas palīdzēs mainīt laiku.

            ctx.fillText("Laiks: " + Math.round(taimeris), 0, 45);
            // uzraksts, kas parādīsies, kad laiks būs beidzies
            if (taimeris <= 0) {
                ctx.fillStyle = "red";
                ctx.font = "bold 40px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Spēles beigas", mansZimejums.width / 2, mansZimejums.height / 2);
                ctx.textAlign = "left";
                // aptur spēli
                clearInterval(apturSpeli);
                return;
            }

            taimeris -= 1 / 40;

            brush_y = mansZimejums.height - pukeHeight;

            ctx.drawImage(brushAtt, brush_x, brush_y, brushWidth, brushHeight);

            color_y = color_y + 3;
            if (color_y > mansZimejums.height) {
                color_y = 0;

                color_x = Math.random() * (mansZimejums.width - colorWidth);
            }
            ctx.drawImage(colorAtt, color_x, color_y, colorWidth, colorHeight);

            // attēlu sadursmes pārbaude
            if (atteluSaskare(brush_x, brush_y, brushWidth, brushHeight, color_x, color_y, colorWidth, colorHeight)) {
                punktuSkaits++;
                color_x = -colorWidth;
                color_y = 0;
            }
        }
        apturSpeli = setInterval(Laukums, 25);

    


        


