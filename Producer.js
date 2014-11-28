var producers = [];

function OnClickButton(id) {
    if (id > numProducersUnlocked)
        return;
    if (numCookies < producers[id].cost)
        return;

    // Buy one instance.
    producers[id].AddInstance();
}

function DrawProducers(canvas)
{
    for (var i = maxNumProducers-1; i >= 0; --i){//Math.min(numProducersUnlocked + 1, maxNumProducers) ; ++i) {
        producers[i].Draw(canvas);
    }
}

function  InitializeProducers()
{
    producers[0] = new Producer("tree", 0, 0.5, 100);
    producers[1] = new Producer("elf", 1, 5, 500);
    producers[2] = new Producer("robot", 2, 50, 2500);
    producers[3] = new Producer("oven", 3, 500, 10000);
    producers[4] = new Producer("factory", 4, 5000, 60000);
    producers[5] = new Producer("rocket", 5, 50000, 42000);
    producers[6] = new Universe();
}

function UpdateProducers(timeSinceLastUpdate) {
    numCookiesPerSecond = 0;
    for (var i = 0; i < maxNumProducers; ++i) {
        numCookiesPerSecond += producers[i].GetIncome();
    }
    for (var i = maxNumProducers - 1; i >= 0; --i) {
        producers[i].Update(timeSinceLastUpdate, producers);
    }

}