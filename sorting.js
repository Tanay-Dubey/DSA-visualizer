//Initialization
const numbers = [];
let upperDiagram = document.querySelector("#upper-bars");
let buttons = document.getElementsByClassName("controls");
let newArrayBtn = document.querySelector("#newArray");
let delayElement = document.getElementById("speedOfSorting");
let delay = 1;  //Default value of speed
let startBtn = document.querySelector("#start");
startBtn.disabled = true;

//Swap function for bubble and selection sort
function swap(el1, el2) {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);
    const transform1 = style1.getPropertyValue("height");
    const transform2 = style2.getPropertyValue("height");
    el1.style.height = transform2;
    el2.style.height = transform1;
}

//Function to disable sort buttons
function disableButtons() {
    Array.from(buttons).forEach((element) => {
        element.disabled = true;
    })
}

function changeBarColor(el1, el2, color) {
    el1.style.backgroundColor = color;
    el2.style.backgroundColor = color;
}

function manageSpeed(wait) {
    delay = 61 - wait;
}

//Bubble Sort
async function bubbleSort() {
    let childElements = upperDiagram.children;
    console.log(childElements);
    newArrayBtn.disabled = true;
    disableButtons();
    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length - i - 1; j++) {
            changeBarColor(childElements[j], childElements[j + 1], "red");
            await new Promise((resolve) => { setTimeout(resolve, delay) });
            if (numbers[j] > numbers[j + 1]) {
                let temp = numbers[j];
                numbers[j] = numbers[j + 1];
                numbers[j + 1] = temp;
                swap(childElements[j], childElements[j + 1]);
            }
            changeBarColor(childElements[j], childElements[j + 1], "yellow");
        }
        childElements[numbers.length - i - 1].style.backgroundColor = "green";
    }
    newArrayBtn.disabled = false;
}

//Selection Sort
async function selectionSort() {
    let childElements = upperDiagram.children;
    console.log(childElements);
    newArrayBtn.disabled = true;
    disableButtons();
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            changeBarColor(childElements[i], childElements[j], "red");
            await new Promise((resolve) => { setTimeout(resolve, delay) });
            if (numbers[i] > numbers[j]) {
                let temp = numbers[i];
                numbers[i] = numbers[j];
                numbers[j] = temp;
                swap(childElements[i], childElements[j]);
            }
            changeBarColor(childElements[i], childElements[j], "yellow");
        }
        childElements[i].style.backgroundColor = "green";
    }
    newArrayBtn.disabled = false;
}

//Insertion Sort
async function insertionSort() {
    let childElements = upperDiagram.children;
    console.log(childElements);
    newArrayBtn.disabled = true;
    disableButtons();
    childElements[0].style.backgroundColor = "green";
    for (let i = 1; i < numbers.length; i++) {
        let temp = numbers[i];
        childElements[i].style.backgroundColor = "red";
        let tempHeight = childElements[i].style.height;
        let j = i - 1;
        while (j >= 0 && numbers[j] > temp) {
            childElements[j].style.backgroundColor = "red";
            await new Promise((resolve) => { setTimeout(resolve, delay) });
            numbers[j + 1] = numbers[j];
            let elementHeight = getComputedStyle(childElements[j]).getPropertyValue("height");
            childElements[j + 1].style.height = elementHeight;
            childElements[j].style.backgroundColor = "green";
            j--;
        }
        numbers[j + 1] = temp;
        childElements[j + 1].style.height = tempHeight;
        childElements[i].style.backgroundColor = "green";
    }
    newArrayBtn.disabled = false;
}

//Merge Sort

async function mergeArray(childElements, l, mid, r) {
    for (let a = l; a <= mid; a++) {
        await new Promise((resolve) => { setTimeout(resolve, delay) });
        childElements[a].style.backgroundColor = "orange";
    }
    for (let a = mid + 1; a <= r; a++) {
        await new Promise((resolve) => { setTimeout(resolve, delay) });
        childElements[a].style.backgroundColor = "red";
    }
    let i = l, j = mid + 1, k = l;
    let tempArray = [];
    while (i <= mid && j <= r) {
        await new Promise((resolve) => { setTimeout(resolve, delay) });
        if (numbers[i] < numbers[j]) {
            tempArray[k] = numbers[i];
            childElements[k].style.height = `${numbers[i]}px`;
            i++;
        }
        else {
            tempArray[k] = numbers[j];
            childElements[k].style.height = `${numbers[j]}px`;
            j++;
        }
        k++;
    }
    while (i <= mid) {
        await new Promise((resolve) => { setTimeout(resolve, delay) });
        tempArray[k] = numbers[i];
        childElements[k].style.height = `${numbers[i]}px`;
        k++;
        i++;
    }
    while (j <= r) {
        await new Promise((resolve) => { setTimeout(resolve, delay) });
        tempArray[k] = numbers[j];
        childElements[k].style.height = `${numbers[j]}px`;
        k++;
        j++;
    }
    for (let k = l; k <= r; k++) {
        numbers[k] = tempArray[k];
    }
}

function mergeSort(numbers, childElements, l, r) {
    if (l < r) {
        let mid = parseInt((l + r) / 2);
        mergeSort(numbers, childElements, l, mid);
        mergeSort(numbers, childElements, mid + 1, r);
        mergeArray(childElements, l, mid, r);
    }
}

function initiateMerge() {
    let childElements = upperDiagram.children;
    console.log(childElements);
    newArrayBtn.disabled = true;
    disableButtons();
    mergeSort(numbers, childElements, 0, numbers.length - 1);
    console.log(numbers);
    newArrayBtn.disabled = false;
}

//Quick Sort

async function partition(numbers, childElements, l, h) {
    let pivot = numbers[l];
    let i = l;
    let j = h;
    while (i < j) {
        await new Promise((resolve) => { setTimeout(resolve, delay) });
        while (numbers[i] <= pivot) {
            childElements[i].style.backgroundColor="red";
            await new Promise((resolve) => { setTimeout(resolve, delay) });
            childElements[i].style.backgroundColor="yellow";
            i++;
        }
        await new Promise((resolve) => { setTimeout(resolve, delay) });
        while (numbers[j] > pivot) {
            childElements[j].style.backgroundColor="orange";
            await new Promise((resolve) => { setTimeout(resolve, delay) });
            childElements[j].style.backgroundColor="yellow";
            j--;
        }
        if (i < j) {
            let temp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
            swap(childElements[i], childElements[j]);
        }
    }
    let temp = numbers[j];
    numbers[j] = numbers[l];
    numbers[l] = temp;
    swap(childElements[j],childElements[l]);

    return j;
}

async function quickSort(numbers, childElements, l, h) {
    if (l < h) {
        let pivot = await partition(numbers, childElements, l, h);
        quickSort(numbers, childElements, l, pivot - 1);
        quickSort(numbers, childElements, pivot + 1, h);
    }
}

function initiateQuickSort() {
    let childElements = upperDiagram.children;
    console.log(childElements);
    newArrayBtn.disabled = true;
    disableButtons();
    quickSort(numbers, childElements, 0, numbers.length - 1);
    newArrayBtn.disabled = false;

}

//Creating array
function createArray(size) {
    numbers.splice(0, numbers.length);
    upperDiagram.innerHTML = "";
    while (numbers.length < size) {
        let r = Math.floor(Math.random() * 100);
        numbers.push(r * 3);
    }
    console.log(numbers);

    let element = document.createElement("div");
    element.classList.add("bar");
    element.style.width = "10px";
    element.style.backgroundColor = "yellow";
    element.style.border = "1px solid";

    for (let i = 0; i < size; i++) {
        element.style.height = `${numbers[i]}px`;
        upperDiagram.appendChild(element.cloneNode(true));
    }
    Array.from(buttons).forEach((element) => {
        element.disabled = false;
    })
    startBtn.disabled = false;
}

function startSorting() {
    algorithms = {
        "0": selectionSort,
        "1": bubbleSort,
        "2": insertionSort,
        "3": initiateMerge,
        "4": initiateQuickSort
    }
    let sortValues = document.getElementsByClassName("form-select");
    algorithms[sortValues[0].value]();
}