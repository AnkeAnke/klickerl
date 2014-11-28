var Step = {
    None: {},
    NumKipferl: {},
    ClickKipferl: {},
    Producer: {},
    KipferlPerSecond: {},
    Universe: {},
};

function Tutorial() {
    this.step = Step.None;
    this.timeSinceBegin = 0;

    this.Continue = function () {
        this.timeSinceBegin = 0;
        switch (this.step) {
            case Step.None:
                if (numProducersUnlocked < 1)
                    this.step = Step.NumKipferl;
                return;
            case Step.NumKipferl:
                this.step = Step.ClickKipferl;
                break;
            case Step.ClickKipferl:
                this.step = Step.Producer;
                break;
            case Step.Producer:
                this.step = Step.KipferlPerSecond;
                break;
            case Step.KipferlPerSecond:
                this.step = Step.Universe;
                break;
            case Step.Universe:
                this.step = Step.None;
                break;
        }
    }

    this.Update = function(timeSinceLastFrame){
        this.timeSinceBegin += timeSinceLastFrame;
    }

    this.Draw = function (context) {
                
        var gerd = (Math.sin(this.timeSinceBegin * 10) > 0 || this.timeSinceBegin > 2) ? "GerdOff" : "GerdOn";

        switch (this.step) {
            case Step.None:
                if (numProducersUnlocked < 1) {
                    context.beginPath();
                    context.lineWidth = "6";
                    context.strokeStyle = "blue";
                    var box = GetCoords(20, 940, 40, 40);
                    context.rect(box.x, box.y, box.w, box.h);
                    context.stroke();

                    DrawScaledTextNormal(context, "?", 40, 941, 30, "center");
                }
                return;
            case Step.NumKipferl:
                context.beginPath();
                context.lineWidth = "6";
                context.strokeStyle = "blue";
                var box = GetCoords(800, 590, 300, 80);
                context.rect(box.x, box.y, box.w, box.h);
                context.stroke();

                DrawScaledTextNormal(context, "Your goal is to amass Kipferls!", 950, 710, 40, "center");
                DrawScaledTextNormal(context, "You can see your current amount of Kipferls here.    ", 950, 760, 40, "center");
                break;
            case Step.ClickKipferl:
                context.beginPath();
                context.lineWidth = "6";
                context.strokeStyle = "blue";
                var box = GetCoords(700, 100, 500, 500);
                context.rect(box.x, box.y, box.w, box.h);
                context.stroke();

                DrawScaledTextNormal(context, "Click here to get a Kipferl!", 950, 15, 40, "center");
                break;
            case Step.Producer:
                context.beginPath();
                context.lineWidth = "6";
                context.strokeStyle = "blue";
                var box = GetCoords(480, 335*0.8, 115, 335*0.2);
                context.rect(box.x, box.y, box.w, box.h);
                context.stroke();

                DrawScaledTextNormal(context, "When you have enough Kipferls,", 20, 350, 40, "left");
                DrawScaledTextNormal(context, "you can buy handy things that", 20, 400, 40, "left");
                DrawScaledTextNormal(context, "help you produce Kipferls.", 20, 450, 40, "left");
                break;
            case Step.KipferlPerSecond:
                context.beginPath();
                context.lineWidth = "6";
                context.strokeStyle = "blue";
                var box = GetCoords(0, 335 * 0.8, 200, 335 * 0.2);
                context.rect(box.x, box.y, box.w, box.h);
                context.stroke();

                context.beginPath();
                context.lineWidth = "6";
                context.strokeStyle = "blue";
                var box = GetCoords(800, 660, 300, 60);
                context.rect(box.x, box.y, box.w, box.h);
                context.stroke();

                DrawScaledTextNormal(context, "The more things you buy,", 600, 450, 40, "right");
                DrawScaledTextNormal(context, "the higher your Kipferl output.", 600, 500, 40, "right");
                break;
            case Step.Universe:
                DrawScaledTextNormal(context, "Now go and conquer the universe!", 1600, 200, 50, "center");
                gerd = "GerdOn";
                break;
        }

        
        DrawScaledPos(context, images.data[gerd], 1300, 400, 600, 600);

        context.beginPath();
        context.lineWidth = "6";
        context.strokeStyle = "blue";
        var box = GetCoords(1500, 300, 200, 70);
        context.rect(box.x, box.y, box.w, box.h);
        context.stroke();

        DrawScaledTextNormal(context, "Continue", 1600, 310, 40, "center");
        
    }
}

