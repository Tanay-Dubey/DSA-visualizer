//Initialization
const numbers = [];
let upperDiagram = document.querySelector("#upper-bars");
let buttons = document.getElementsByClassName("controls");
let newArrayBtn = document.querySelector("#newArray");

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

//Bubble Sort
async function bubbleSort() {
    let childElements = upperDiagram.children;
    console.log(childElements);
    newArrayBtn.disabled = true;
    disableButtons();
    for (let i = 0; i < numbers.length; i++) {
        for(let j=0;j<numbers.length-i-1;j++)
        {
            changeBarColor(childElements[j],childElements[j+1],"red");
            await new Promise((resolve)=>setTimeout(resolve,1));
            if(numbers[j]>numbers[j+1])
            {
                let temp=numbers[j];
                numbers[j]=numbers[j+1];
                numbers[j+1]=temp;
                swap(childElements[j],childElements[j+1]);
            }
            changeBarColor(childElements[j],childElements[j+1],"yellow");
        }
        childElements[numbers.length-i-1].style.backgroundColor="green";
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
        for(let j=i+1;j<numbers.length;j++)
        {
            changeBarColor(childElements[i],childElements[j],"red");
            await new Promise((resolve)=>setTimeout(resolve,20));
            if(numbers[i]>numbers[j])
            {
                let temp=numbers[i];
                numbers[i]=numbers[j];
                numbers[j]=temp;
                swap(childElements[i],childElements[j]);
            }
            changeBarColor(childElements[i],childElements[j],"yellow");
        }
        childElements[i].style.backgroundColor="green";
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
            await new Promise(resolve => setTimeout(resolve, 1));
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

function mergeArray(childElements, l, mid, r) {
    let i = l, j = mid + 1, k = l;
    let tempArray = [];
    let tempChildren = [];
    while (i <= mid && j <= r) {
        if (numbers[i] < numbers[j]) {
            tempArray[k] = numbers[i];
            tempChildren[k] = childElements[i];
            i++;
        }
        else {
            tempArray[k] = numbers[j];
            tempChildren[k] = childElements[j];
            j++;
        }
        k++;
    }
    while (i <= mid) {
        tempArray[k] = numbers[i];
        tempChildren[k] = childElements[i];
        k++;
        i++;
    }
    while (j <= r) {
        tempArray[k] = numbers[j];
        tempChildren[k] = childElements[j];
        k++;
        j++;
    }
    for (let k = l; k <= r; k++) {
        numbers[k] = tempArray[k];
        childElements[k] = tempChildren[k];
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
    disableSortButtons();
    mergeSort(numbers, childElements, 0, numbers.length - 1);
    console.log(numbers);
}

//Quick Sort
function quickSort() {

}

//Creating array
function createArray(size, duo) {
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
}

function startSorting()
{
    algorithms={
        "0":selectionSort,
        "1":bubbleSort,
        "2":insertionSort,
        "3":initiateMerge,
        "4":quickSort
    }
    let sortValues=document.getElementsByClassName("form-select");
    algorithms[sortValues[0].value]();
}