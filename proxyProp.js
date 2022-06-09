const props = {
    name: 'Abby',
    chat: 'the last of us. Part II',
    getChat() {
        this._privateMethod();
    },
    _privateMethod() {
        console.log(this._privateProp);
    },
    __privateMethodToo() {
    },
    _privateProp: 'Нельзя получить просто так',
};

const proxyProps = new Proxy(props, {
    set(target, prop, value) {
        if (prop.indexOf('_') === 0) {
            throw new Error('Нет прав')
        } else {
            target[prop] = value;
        }
        return true;
    },
    get(target, prop) {
        console.log('Нельзя получить просто так 2');
        return true;
    }
});

proxyProps.getChat();
delete proxyProps.chat;

proxyProps.newProp = 2;
console.log(proxyProps.newProp);

try {
    proxyProps._newPrivateProp = 'Super game';
} catch (error) {
    console.log(error);
}

try {
    delete proxyProps._privateProp;
} catch (error) {
    console.log(error); // Error: Нет прав
}

/*
	* Вывод в консоль следующий:
Нельзя получить просто так
2
Error: Нет прав
Error: Нет прав
*/