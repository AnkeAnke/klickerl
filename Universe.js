var numProducersUnlocked = 0;
var maxNumProducers = 7;

var costMultiplier = 1.1;

var Celestial = {
    Star0: { name: "star0", value: 0, rnd: 0.25, speed: 1, shrink: 0.1, idle: 1 },
    Star1: { name: "star1", value: 0, rnd: 0.25, speed: 1, shrink: 0.1, idle: 1 },
    Star2: { name: "star2", value: 0, rnd: 0.25, speed: 1, shrink: 0.1, idle: 1 },
    Meteor: { name: "meteor", value: 1, rnd: 0.15, speed: 10, shrink: 0, idle: 0.0001},
    Satelite: { name: "satelite", value: 2, rnd: 0.10, speed: 3, shrink: 0, idle: 2 }
};

var ProducerNames = {
    0: { name: "tree" },
    1: { name: "elf" },
    2: { name: "robot" },
    3: { name: "oven" },
    4: { name: "factory" },
    5: { name: "rocket" },
    6: { name: "star0" },
    7: { name: "cursor" }
};

var shoe = false;
function ClickShoe() {
    shoe = false;
}

var Movement = {
    down : { move: 1 },
    up : { move: -1},
    stay: { move: 0 }
    };

function ShoeEvent(pos, image) {
    this.lifetime = 6;
    this.remainingLifetime = this.lifetime;
    this.pos = pos;
    this.size = 0;
    this.image = image;
    
    this.Update = function (timeSinceLastUpdate) {
        this.remainingLifetime -= timeSinceLastUpdate;
        var percentage = this.remainingLifetime < 1 ?
            Smoothstep(0, 1, this.remainingLifetime)
            : this.remainingLifetime > this.lifetime - 1 ?
            Smoothstep(0, 1, this.lifetime - this.remainingLifetime) : 1;
        this.size = percentage * 200;
    }

    this.Draw = function (canvas) {
        DrawScaledPos(canvas, images.data["event"], this.pos.x - this.size * 0.5, this.pos.y - this.size * 0.5, this.size, this.size);
        DrawScaledPos(canvas, this.image, this.pos.x - this.size * 0.25, this.pos.y - this.size * 0.25, this.size * 0.5, this.size * 0.5);
        DrawScaledPos(canvas, images.data["event2"], this.pos.x - this.size * 0.5, this.pos.y - this.size * 0.5, this.size, this.size);
    }
}

function Schorsch() {
    this.lineLength = 150;
    this.start = new Vector(700 + 475, 100 + 470 * 0.5);
    this.endImage = "smallKipferl";
    this.size = 35;
    this.movement = Movement.down;

    this.Draw = function (canvas) {
        DrawScaledPosCrop(canvas, images.data["line"], this.start.x-3, this.start.y, 25, this.lineLength, 0, 930 - this.lineLength, 25, this.lineLength);
        DrawScaledPos(canvas, images.data["smallCircle"], this.start.x-3, this.start.y + this.lineLength - 60, 30, 30);
        DrawScaledPos(canvas, images.data[this.endImage], this.start.x-(this.size-25)*0.5, this.start.y + this.lineLength - 5, this.size, this.size);
    }

    this.ClickShoe = function(){
        this.endImage = "smallKipferl";
        this.size = 35;
        images.data["shoe"].cookieW = 0;
    }

    this.SetShoe = function () {
        shoe = true;
        this.endImage = "shoe";
        this.size = 150;
        images.data["shoe"].mouseclick = function () { ClickShoe() };
        images.data["shoe"].cookieW = 150;
        images.data["shoe"].cookieH = 150;
        images.data["shoe"].cookieX = this.start.x - (this.size - 25) * 0.5;
        images.data["shoe"].cookieY = this.start.y + this.lineLength - 5;
    }

    this.Update = function (timeSinceLastUpdate, numStars) {
        this.lineLength += this.movement.move;

        var rnd = Math.random();
        if (rnd < 0.001) this.movement = Movement.down;
        else if (rnd < 0.002) this.movement = Movement.up;
        else if (rnd < 0.003) this.movement = Movement.stay;

        if (this.lineLength >= 950 - this.start.y) {
            var rnd = Math.random();
            if (rnd > 0.05) this.movement = Movement.stay;
            else if (rnd > 0.05 * 5 / Math.sqrt(Math.max(1, numStars))) this.SetShoe();
            else this.movement = Movement.up;
        }

        if (this.lineLength < 100) this.movement = Movement.down;

        if (this.endImage != "shoe") return;
        images.data["shoe"].cookieX = this.start.x - (this.size - 25) * 0.5;
        images.data["shoe"].cookieY = this.start.y + this.lineLength - 5;
        images.data["shoe"].cookieH = Math.min(150, 905 - this.start.y - this.lineLength);
    }
}

function Star(universe) {
    this.universe = universe;

    this.Respawn = function () {
        this.size = 100;
        this.lifeTime = 60 * (1 + Math.random() - 0.5); // Life time in seconds
        this.remainingLifeTime = this.lifeTime;

        this.type = Celestial.Star0;
        this.pos = new Vector(0, 0);
        this.move = new Vector(0, 0);

        this.smoothScale = 1;

        var rndImage = Math.random();
        var sumRnd = 0;
        for (var key in Celestial) {
            sumRnd += Celestial[key].rnd;
            if (rndImage <= sumRnd) {
                this.type = Celestial[key];
                break;
            }
        }
        switch (this.type.value) {
            case 2:
            case 0:
                do {
                    this.pos.x = Math.random() * 600 + 650;
                    this.pos.y = Math.random() * 800 + 50;
                } while (this.pos.Diff(new Vector(950, 350)).Length() < 250);
                this.move.x = Math.random() * 2 - 1;
                this.move.y = Math.random() * 2 - 1;
                break;
            case 1:
                this.pos.x = Math.random() * 600 + 750;
                this.pos.y = Math.random() * 900 -100;
                if (Math.random() > 0.4) this.pos.x = 500;
                else this.pos.y = -100;
                this.move.x = 1;
                this.move.y = 2;
                this.move = this.move.Mult(1 + Math.random()-0.5);
                console.log(this.move.x);
                this.size *= 1 + Math.random() * 0.6 - 0.3;
                break;
        }
    }

    this.Respawn();

    this.Draw = function (context) {
        DrawScaledPos(context, images.data[this.type.name], this.pos.x - this.size * this.smoothScale * 0.5, this.pos.y - this.size * this.smoothScale * 0.5, this.size * this.smoothScale, this.size * this.smoothScale);
    }

    this.Update = function (timeSinceLastUpdate) {
        if (this.remainingLifeTime < 0 || this.pos.x > 1500 || this.pos.y > 1000)
            this.Respawn();
        this.pos = this.pos.Add(this.move.Mult(timeSinceLastUpdate * this.type.speed * 1.5));

        if (this.type.value == 1)
            return;

        this.move.x += (Math.random() * 2 - 1) * this.move.y * this.type.idle * 0.01;
        this.move.y += (Math.random() * 2 - 1) * this.move.x * this.type.idle * 0.01;
        
        this.move = this.move.Normalized();
        
        this.remainingLifeTime -= timeSinceLastUpdate;
        
        // Compute size. Smoothstep and sin
        var percentage = this.remainingLifeTime < 9 ?
            Smoothstep(0, 9, this.remainingLifeTime)
            : this.remainingLifeTime > this.lifeTime - 9 ?
            Smoothstep(0, 9, this.lifeTime - this.remainingLifeTime) : 1;
        this.size = (1 + Math.sin(this.remainingLifeTime) * this.type.shrink) * percentage * 100;
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Universe() {
    this.moonImage = images.data["kipferl"];
    this.starImages = [images.data["star0"], images.data["star1"], images.data["star2"]];
    this.meteorImage = images.data["meteor"];
    this.sateliteImage = images.data["satelite"];
    this.income = 500000;
    this.cost = 15000000;
    this.stars = [];
    this.instances = -1;
    this.interactingStars = [];
    this.schorsch = new Schorsch();
    this.event = false;

    this.ComputeMovements = function(timeSinceLastUpdate) {
        for (var i = 0; i < this.instances; ++i) {
            this.stars[i].Update(timeSinceLastUpdate);
        }

        this.interactingStars = [];
        for (var i = 0; i < this.instances; ++i) {
            if (this.stars[i].type.value == 0)
                this.interactingStars[i] = this.stars[i];
        }

        for (var star in this.interactingStars) {
            var smoothDecimated = false;
            for (var other in this.interactingStars) {
                if (star == other) continue;
                var diff = this.interactingStars[star].pos.Diff(this.interactingStars[other].pos);
                var d = diff.Length();

                if (diff.Length() < this.interactingStars[star].size * this.interactingStars[star].smoothScale + this.interactingStars[other].size * this.interactingStars[other].smoothScale) {
                    //var prop = this.interactingStars[star].size / (this.interactingStars[star].size + this.interactingStars[other].size);
                    //this.interactingStars[star].size = d * prop;
                    //this.interactingStars[other].size = d * (1-prop);
                    this.interactingStars[star].smoothScale *= 0.99;
                    this.interactingStars[other].smoothScale *= 0.99;
                    smoothDecimated = true;
                    //this.interactingStars[star].size *= 0.999;
                    //this.interactingStars[other].size *= 0.999;
                }

                var push = 5000 / d / d;
                
                this.interactingStars[star].move = this.interactingStars[star].move.Add(diff.Mult(push*push));
            }
            if (!smoothDecimated) {
                this.interactingStars[star].smoothDecimated = Math.min(1, this.interactingStars[star].smoothDecimated * 1.01);
            }

            //this.size *= this.smoothScale;

            var borderVec = new Vector(0, 0);
            var borderDist = 0;

            // Left border
            borderDist = this.interactingStars[star].pos.x - 600;
            borderDist = borderDist < 5 ? Smoothstep(0, 5, 5-borderDist) * 30 : 0;
            borderVec = borderVec.Add(new Vector(1, 0).Mult(borderDist));
            // Right border
            borderDist = 1300 - this.interactingStars[star].pos.x;
            borderDist = borderDist < 5 ? Smoothstep(0, 5, 5 - borderDist) * 30 : 0;
            borderVec = borderVec.Add(new Vector(-1, 0).Mult(borderDist));
            // Top border
            borderDist = this.interactingStars[star].pos.y - 0;
            borderDist = borderDist < 5 ? Smoothstep(0, 5, 5 - borderDist) * 30 : 0;
            borderVec = borderVec.Add(new Vector(0, 1).Mult(borderDist));
            // Bottom border
            borderDist = 900 - this.interactingStars[star].pos.y;
            borderDist = borderDist < 5 ? Smoothstep(0, 5, 5 - borderDist) * 30 : 0;
            borderVec = borderVec.Add(new Vector(0, -1).Mult(borderDist));

            this.interactingStars[star].move = this.interactingStars[star].move.Add(borderVec);
            this.interactingStars[star].move = this.interactingStars[star].move.Normalized();
        }

    }

    this.Update = function (timeSinceLastUpdate, producers) {
        if (numProducersUnlocked < maxNumProducers - 1) {
            return;
        }

        if (this.schorsch.endImage == "shoe" && !shoe) {
            var rnd = Math.random() * 15;
            var index = Math.floor(Math.min(rnd, 7));
            
            this.event = new ShoeEvent(this.schorsch.start.Add(new Vector(12, this.schorsch.lineLength + 15)), images.data[ProducerNames[index].name]);
            if (index != 7)
                producers[index].income *= 2;
            else
                cookiesPerClick *= 2;
            this.schorsch.ClickShoe();
        }

        if (this.event != false) {
            this.event.Update(timeSinceLastUpdate);
        }

        this.ComputeMovements(timeSinceLastUpdate);
        this.schorsch.Update(timeSinceLastUpdate, this.instances);
    }

    this.Draw = function (canvas) {
        // Draw stars.
        for (var key in this.interactingStars) {
            this.interactingStars[key].Draw(canvas);
        }
        // Draw satelites.
        for (var i = 0; i < this.instances; ++i) {
            if (this.stars[i].type.value == 2)
                this.stars[i].Draw(canvas);
        }

        if (this.instances >= 0) {
            this.schorsch.Draw(canvas);
        }
        DrawScaledPos(canvas, this.moonImage, 700, 100, 500, 500);

        // Get the correct string for the number of cookies.
        var cookieText = GetFormattedNumber(numCookies, 0);
        var cookiePlusText = GetFormattedNumber(numCookiesPerSecond, 1);

        DrawScaledPos(canvas, images.data["textBG"], 700, 550, 500, 200);
        DrawScaledText(canvas, cookieText + "c", 950, 600, 60, "center");
        DrawScaledText(canvas, "+" + cookiePlusText + " s", 950, 670, 30, "center");

        if (numProducersUnlocked < maxNumProducers - 1) {
            DrawScaledPos(canvas, images.data["anke"], 610, 960, 150, 30);
            return;
        } else {
            DrawScaledPos(canvas, images.data["anke"], 610, 865, 150, 30);
        }

        
        // Draw click box
        DrawScaled(context, images.data["boxUniverse"]);

        var size = this.cost <= numCookies ? 45 : 25;
        DrawScaledText(canvas, "" + GetFormattedNumber(this.cost, 0) + " c", 1270, 905 + (100 - size) / 2, size, "right");
        DrawScaledText(canvas, "+" + GetFormattedNumber(this.income, 0) + " s", 630, 905 + 25, 45, "left");

        if (this.instances >= 0)
            DrawScaledPos(canvas, images.data["winText"], 600 + (700 - 450) * 0.5, 10, 450, 100);

            

        // Draw meteors.
        for (var i = 0; i < this.instances; ++i) {
            if (this.stars[i].type.value == 1)
                this.stars[i].Draw(canvas);
        }

        if (this.event) {
            this.event.Draw(canvas);
        }
    }

    this.GetIncome = function () {
        return this.income * Math.max(this.instances, 0);
    }

    this.AddInstance = function () {
        numCookies -= this.cost;
        this.cost *= costMultiplier;
        this.cost = Math.floor(this.cost);

        if (this.instances == -1) {
            this.instances++;
            this.moonImage = images.data["moon"];
            numProducersUnlocked++;
        } else {
            this.stars[this.instances] = new Star(this);
            this.instances++;
        }
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function Producer(name, id, income, cost) {
    this.name = name;
    this.id = id;

    this.posX = id > (maxNumProducers / 2 - 1) ? 1300 : 0;
    this.posY = (id % Math.floor(maxNumProducers / 2)) * 335 - 5;
    this.width = 600;
    this.height = 345;

    this.instances = 0;
    this.instancesX = {};
    this.instancesY = {};
    
    this.image = images.data[name];
    this.income = income;
    this.cost = cost;

    this.AddInstance = function () {
        numCookies -= this.cost;
        this.cost *= costMultiplier;
        this.cost = this.cost.toFixed(0);
        this.instancesX[this.instances] = Math.random();
        this.instancesY[this.instances] = Math.random();

        // Order the list by Y. Insertion sort.
        var tmpY = this.instancesY[this.instances];
        var tmpX = this.instancesX[this.instances];
        var insertIndex = this.instances;

        for (var i = 0; i < this.instances; ++i) {
            // If the new object would be in front of other object...
            if (this.instancesY[i] > tmpY) {
                insertIndex = i;
                break;
            }
        }
        for (var j = this.instances; j > insertIndex; --j) {
            this.instancesX[j] = this.instancesX[j - 1];
            this.instancesY[j] = this.instancesY[j - 1];
        }
        this.instancesX[insertIndex] = tmpX;
        this.instancesY[insertIndex] = tmpY;

        this.instances++;


        // If this was the first bought item of this type, unlock new content.
        if (this.instances == 1 && id < maxNumProducers - 1)
            numProducersUnlocked++;

        //// Update income.
        //numCookiesPerSecond += this.income;
    }

    this.GetIncome = function(){
        return Math.max(this.income, 0) * this.instances;
    }

    this.Update = function (timeSinceLastUpdate) {
    }

    this.Draw = function (canvas) {
        if (this.id > numProducersUnlocked)
            return;

        DrawScaledPos(canvas, images.data["frame"], this.posX, this.posY, this.width, this.height);

        for (var i = 0; i < this.instances; ++i) {
            var xPosInst = this.posX + 10 + this.instancesX[i] * (this.width - 10 - 100);
            var yPosInst = this.posY + 10 + this.instancesY[i] * (this.height * 0.8 - 10 - 100);
            DrawScaledPos(canvas, this.image, xPosInst, yPosInst, 100, 100);
        }

        if (this.instances == 0) {
            DrawScaledPos(canvas, images.data["circle"], this.posX + 200, this.posY + 50, 200, 200);
            DrawScaledPos(canvas, this.image, this.posX + 230, this.posY + 80, 140, 140);
        }

        // Draw Text
        var size = this.cost <= numCookies ? 47 : 30;
        DrawScaledText(canvas, "+" + GetFormattedNumber(this.income, 1) + " s", this.posX + 15, this.posY + this.height * 0.8 + 10, 47, "left");
        DrawScaledText(canvas, "" + GetFormattedNumber(this.cost, 0) + " c", this.posX + 600 - 15, this.posY + this.height * 0.8 + (this.height*0.18 - size)/2, size, "right");
    }
}