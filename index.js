// 1. Please write a function that shows the usage of closures

// Suppose you want to check if a user is old enough to buy a product, e.g. alcohol.

const checkUserAge = (user = { name: '', age: null }) => {

    let userToBeChecked = user;

    const display = () => {
        console.log(`Hello ${userToBeChecked.name}, ${userToBeChecked.age >= 18 ? 'good news - you are allowed to but this product.' : "I am sorry - you aren't old enough to buy this product!"}`);
    };

    return display;
}

const tomek = checkUserAge({ name: 'Tomek', age: 22 });
tomek();

const ola = checkUserAge({ name: 'Ola', age: 17 });
// ola();

const unknownUser = checkUserAge();
// unknownUser();


// Example 2
// Suppose you want to check how long a user remains on our website

const time = () => {
    let seconds = 0;

    return () => {
        seconds++;
        console.log(`Time spent on this website ${seconds} ${seconds === 1 ? 'second' : 'seconds'}.`);
    }
}

const startCounting = time();

setInterval(startCounting, 1000);


// 2. Please write a function that returns a sum of array items
// example input [9, 1, 22, 0, 2]
// example output 34

const input = [9, 1, 22, 0, 2];

// Version A

const sumItUp = input.reduce((prev, curr) => {
    return prev + curr;
}, 0);

// console.log(sumItUp);

// Version B

const sumItUp2 = array => {
    const total = array.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
    return total;
}

// console.log(sumItUp2(input));

// 3. Please write a recursive function that flattens a list of items
// example input [[2, [4, [44,5,6]]], [4,5,6], [[2,4], 4], 5]]
// example output [2, 4, 44, 5, 6, 4, 5, 6, 2, 4, 4, 5]

const initialArr = [[2, [4, [44, 5, 6]]], [4, 5, 6], [[2, 4], 4], 5];

const flatArr = arrToBeFlatten => {
    return arrToBeFlatten.reduce((prev, curr) => Array.isArray(curr) ? prev.concat(flatArr(curr)) : prev.concat(curr), []);
}

// console.log(flatArr(initialArr));

const flatArrVersion2 = arrToBeFlatten => {
    const resultArr = [];
    arrToBeFlatten.forEach(item => {
        if (Array.isArray(item)) {
            const innerArr = flatArrVersion2(item);
            innerArr.forEach(i => resultArr.push(i))
        } else resultArr.push(item);
    })
    return resultArr;
}

// console.log(flatArrVersion2(initialArr));

// 4. Please write a function that finds all common elements of two arrays(only primitive types as array elements, order doesn't matter)
// example inputs ['b', 3, 4, 76, 'c'], ['a', 'b', 4, 76, 21, 'e']
// example output ['b', 4, 76]

const sampleArr1 = ['b', 3, 4, 76, 'c'];
const sampleArr2 = ['a', 'b', 4, 76, 21, 'e'];

const arrWithCommonEl = (arr1, arr2) => {
    return arr1.filter(item => arr2.includes(item));
}

// console.log(arrWithCommonEl(sampleArr1, sampleArr2));



// 5. Please write a function that finds all different elements of two arrays(only primitive types as array elements, order doesn't matter)
// example inputs ['b', 3, 4, 76, 'c'], ['a', 'b', 4, 76, 21, 'e']
// example output ['a', 3, 21, 'c', 'e']


const sampleArr3 = ['b', 3, 4, 76, 'c'];
const sampleArr4 = ['a', 'b', 4, 76, 21, 'e'];

function arrWithDifferentEl(arr1, arr2) {
    const inputArrs = arr1.concat(arr2);
    return inputArrs.filter(item => !arr1.includes(item) || !arr2.includes(item));
}

// console.log(arrWithDifferentEl(sampleArr3, sampleArr4));

// 6. Please write a function that takes two arrays of items and returns an array of tuples made from two input arrays at the same indexes. Excessive items should be dropped.
// example input [1,2,3], [4,5,6,7]
// example output [[1,4], [2,5], [3,6]]

{
    const sampleArr1 = [1, 2, 3];
    const sampleArr2 = [4, 5, 6, 7];

    const createTupleArr = (arr1, arr2) => {
        const tupleArr = [];
        for (let index in sampleArr1) {
            if (arr1[index] >= 0 && arr2[index] >= 0) tupleArr.push([arr1[index], arr2[index]]);
        }
        return tupleArr;
    }

    // console.log(createTupleArr(sampleArr1, sampleArr2));

}

// 7. Please write a function which takes a path(path is an array of keys) and object, then returns value at this path. If value at path doesn't exists, return undefined.
// example inputs ['a', 'b', 'c', 'd'], { a: { b: { c: { d: '23' } } } }
// example output '23'
const sampleObject = {
    a: {
        b: {
            c: {
                d: '23'
            }
        }
    }
}


const getValueOfObjectPath = (obj, path, def = undefined) => {

    let myCurrentObject = obj;

    for (let index in path) {
        if (myCurrentObject[path[index]]) myCurrentObject = myCurrentObject[path[index]];
        else return def;
    }

    return myCurrentObject;

};

// console.log(getValueOfObjectPath(sampleObject, ['a', 'b', 'c', 'd']));


// 8. Please write compare function which compares 2 objects for equality.
// example input { a: 'b', c: 'd' }, { c: 'd', a: 'b' }  /// output true
// example input { a: 'c', c: 'a' }, { c: 'd', a: 'b', q: 's' }  /// output false

const compareObjectsEquqlity = function (obj1, obj2) {

    if (Object.keys(obj1).length === Object.keys(obj2).length) {
        return Object.keys(obj1).every(key => obj1[key] === obj2[key]);
    }
    return false;
}

// console.log(compareObjectsEquqlity({ a: 'b', c: 'd' }, { c: 'd', a: 'b' }));
// console.log(compareObjectsEquqlity({ a: 'c', c: 'a' }, { c: 'd', a: 'b', q: 's' }));


// 9. Please write a function which takes a list of keys and an object, then returns this object, just without keys from the list
// example input ['color', 'size'], { color: 'Blue', id: '22', size: 'xl' }
// example output { id: '22' }
const sampleArr = ['color', 'size'];
const sampleObj = { color: 'Blue', id: '22', size: 'xl' };


const getDataFromObject = (arr, obj) => {
    const keysArr = Object.keys(obj);
    const uniqueKeys = keysArr.filter(key => arr.indexOf(key) < 0);

    return uniqueKeys.reduce((obj2, key) => (obj2[key] = obj[key], obj2), {})
};


// console.log(getDataFromObject(sampleArr, sampleObj));