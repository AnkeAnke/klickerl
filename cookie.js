var numCookies = 0;
var numCookiesPerSecond = 0;
var images = 0;
var cookiesPerClick = 1;
var clicks = [];

function Click(pos, value) {
    this.pos = pos;
    this.value = value;
    this.lifetime = 2;
    this.remainingLifetime = this.lifetime;

    this.Update = function (timeSinceLastUpdate) {
        this.remainingLifetime -= timeSinceLastUpdate;
    }

    this.Draw = function (canvas) {
        var percentage = this.remainingLifetime < 0.5 ?
            Smoothstep(0, 0.5, this.remainingLifetime)
            : this.remainingLifetime > this.lifetime - 0.5 ?
            Smoothstep(0, 0.5, this.lifetime - this.remainingLifetime) : 1;

        var size = GetCoords(40*percentage, 0);
        DrawText(canvas, "+" + GetFormattedNumber(value, 0)+ " c", pos.x + 50, pos.y, size.x, "left");
    }
}

function OnCookieClick() {
    numCookies += cookiesPerClick;
    clicks[clicks.length] = new Click(new Vector(mousePos.x, mousePos.y), cookiesPerClick);
}

function OnBuy0Click() {
    alert('buy0');
}

function OnBuy1Click() {
    alert('buy1');
}

function DrawGameContent(canvas)
{
    DrawProducers(canvas);

    for (var i = 0; i < clicks.length; ++i) {
        clicks[i].Draw(canvas);
    }
}

function UpdateCookies(timeSinceLastFrame)
{
    UpdateProducers(timeSinceLastFrame);
    numCookies += timeSinceLastFrame * numCookiesPerSecond;

    for (var i = 0; i < clicks.length; ++i) {
        clicks[i].Update(timeSinceLastFrame);

        if (clicks[i].remainingLifetime < 0) {
            clicks.shift();
            i--;
        }
    }
}

