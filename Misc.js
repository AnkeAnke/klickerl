

function GetFormattedNumber(number, fixNum) {
    var cookieText = "";
    if (number >= 1000000000000) {
        cookieText = "" + (Math.floor(number / 1000000000)*0.001).toFixed(3) + " T"
    }
    else
    if (number >= 1000000000) {
        cookieText = "" + (Math.floor(number / 1000000) * 0.001).toFixed(3) + " B"
    }
    else
        if (number >= 1000000) {
            cookieText = "" + (Math.floor(number / 1000) * 0.001).toFixed(3) + " M"
        }
        else {
            cookieText = "";
            if (number >= 1000000)
                cookieText += Math.floor(number / 1000000) + " ";
            if (number >= 1000) {
                var thousands = Math.floor((number % 1000000) / 1000);
                if (number > 1000000) {
                    if (thousands < 100)
                        cookieText += 0;
                    if (thousands < 10)
                        cookieText += 0;
                }
                cookieText += thousands + " ";
            }
            var small = (number % 1000);
            if (small == Math.floor(small)) {
                small = Math.floor(small);
            }
            else
                small = small.toFixed(fixNum);
            if (number >= 1000) {
                if (small < 100)
                    cookieText += 0;
                if (small < 10)
                    cookieText += 0;
            }
            cookieText += small;
        }

    return cookieText;
}

function GetDistance(x1, y1, x2, y2) {
    var xd = x1 - x2;
    var yd = y1 - y2;
    var lsq = xd * xd + yd * yd;
    return Math.sqrt(lsq);
}

function Normalize(x, y) {
    var length = GetDistance(x, y, 0, 0);
    x /= length;
    y /= length;
}

function Smoothstep(min, max, t) {
    var x = Math.max(0, Math.min((t - min) / (max - min), 1));
    return x * x * (3 - 2 * x);
};

function Vector(x, y) {
    this.x = x;
    this.y = y;

    this.Add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    this.Diff = function (v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    this.Add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    this.Length = function(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    this.Normalized = function () {
        var l = this.Length();
        return new Vector(this.x / l, this.y / l);
    }

    this.Mult = function (f) {
        return new Vector(this.x * f, this.y * f);
    }
}