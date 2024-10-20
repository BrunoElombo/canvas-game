class Player{
    constructor(_x, _y, _dx, _dy, _width, _height){
        this._x = _x;
        this._y = _y;
        this._width = _width;
        this._height = _height;
        this._dx = _dx;
        this._dy = _dy
    }

    _width = 0;
    _height = 0;
    _x = 0;
    _y = 0;
    _speed = 5;
    _dx = 0;
    _dy = 0;
    _score = 0;

    getWidth(){
        return this._width;
    }

    setWidth(width){
        this._width = width;
    }

    getHeight(){
        return this._height;
    }

    setHeight(height){
        this._height = height;
    }

    getX() {
        return this._x;
    }

    setX(x) {
        this._x = x;
    }

    getY() {
        return this._y;
    }

    setY(y) {
        this._y = y;
    }

    getSpeed() {
        return this._speed;
    }

    setSpeed(speed) {
        this._speed = speed;
    }

    getDx() {
        return this._dx;
    }

    setDx(dx) {
        this._dx = dx;
    }

    getDy() {
        return this._dy;
    }

    setDy(dy) {
        this._dy = dy;
    }

    getScore() {
        return this._score;
    }

    setScore(score) {
        this._score = score;
    }

    moveUp(){

    }

    moveDown(){

    }

    moveFront(){

    }

    moveBack(){

    }
}
