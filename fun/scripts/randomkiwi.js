/**
 * LRU cache used to prevent photos from repeating too early.
 * Average O(1) insert and look-up.
 */
class LRU {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();

        this.head = {};
        this.tail = {};

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    removeLastUsed() {
        const [ key, next, prev ]  = [ this.head.next.key, this.head.next.next, this.head ];

        this.map.delete(key);
        this.head.next = next;
        this.head.next.prev = prev;
    }

    put (key, value) {
        const hasKey = this.get(key) !== -1;
        const isAtCapacity = this.map.size === this.capacity;
        
        if (hasKey) return (this.tail.prev.value = value);
        if (isAtCapacity) this.removeLastUsed();

        const node = { key, value };
        this.map.set(key, node);
        this.moveToFront(node);
    }

    moveToFront (node) {
        const [ prev, next ] = [ this.tail.prev, this.tail ];

        this.tail.prev.next = node;
        this.connectNode(node, { prev, next });
        this.tail.prev = node;
    }

    connectNode (node, top) {
        node.prev = top.prev;
        node.next = top.next;
    }

    get (key) {
        const hasKey = this.map.has(key);
        if (!hasKey) return -1;

        const node = this.map.get(key);
        
        this.disconnectNode(node);
        this.moveToFront(node);

        return node.value;
    }

    disconnectNode (node) {
        node.next.prev = node.prev;
        node.prev.next = node.next;
    }
}

const photo = document.getElementById("kiwi-pic");
const newPicButton = document.getElementById("new-pic-button");

// number of pics currently in Kiwi folder
const NUMPICS = 80;

// minimum number of pictures before the user should see a repeat image
const NOREPEAT = 20;

// LRU cache preventing repeat pics too often
const recentPics = new LRU(NOREPEAT);

function getRandomPicUrl() {
    picNum = Math.floor(Math.random() * NUMPICS);
    if (picNum < 10) {
        return `../img/kiwi/0${picNum}.jpg`;
    } else {
        return `../img/kiwi/${picNum}.jpg`;
    }
}

function randomizePhoto() {
    let randomUrl = getRandomPicUrl();

    while (recentPics.get(randomUrl) != -1) {
        randomUrl = getRandomPicUrl();
    }

    recentPics.put(randomUrl, 0);

    photo.src = randomUrl;
}




randomizePhoto();

newPicButton.addEventListener('click', randomizePhoto);

