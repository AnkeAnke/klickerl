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

    this.Update = function(timeSinceLastFrame){

    }

    this.Draw = function (context) {
        switch (this.step) {
            case Step.None:
                return;
            case Step.NumKipferl:
                context.beginPath();
                context.lineWidth = "6";
                context.strokeStyle = "blue";
                var box = GetCoords(700, 100, 500, 500);
                context.rect(box.x, box.y, box.w, box.h);
                context.stroke();
                break;
            case Step.ClickKipferl:
                break;
            case Step.Producer:
                break;
            case Step.KipferlPerSecond:
                break;
            case Step.Universe:
                break;
        }
        
    }
}

