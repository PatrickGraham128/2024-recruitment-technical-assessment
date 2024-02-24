
/**
 * Task 1
 */
function leafFiles(files) {
    const idNameMap = new Map()
    files.forEach(file => (idNameMap.set(file.id, file.name)))
    files.forEach(file => {if (idNameMap.has(file.parent)) idNameMap.delete(file.parent)})
    return Array.from(idNameMap.values())
}

/**
 * Task 2
 */
function kLargestCategories(files, k) {
    if (k < 0 || !Number.isInteger(k)) throw new Error("Value for k must be a positive integer")
    const categoriesSizeMap = new Map()
    const categoriesArray = [];
    for (let file of files) {
        for (category of file.categories) {
            if (categoriesSizeMap.has(category)) {
                categoriesSizeMap.set(category, categoriesSizeMap.get(category) + 1)
            } else {
                categoriesArray.push(category)
                categoriesSizeMap.set(category, 1)
            }
        }
    }
    mapArr = Array.from(categoriesSizeMap).sort(function(a,b) {
        if (a[0] === b[0] && a[1] === b[1]) return 0
        if (a[1] === b[1]) return ((a[0].toLowerCase() < b[0].toLowerCase()) ? -1 : 1)
        return ((a[1] > b[1]) ? -1 : 1)
    })
    if (k > mapArr.length) k = mapArr.length - 1
    return mapArr.map(element => element[0]).slice(0, k)
}

/**
 * Task 3
 */
function largestFileSize(files) {
    let largestFileSize = 0

    const idSizeMap = new Map()
    files.forEach(file => {idSizeMap.set(file.id, file.size)})

    const idChildMap = new Map()
    for (let file of files) {
        if (!idChildMap.has(file.parent)) idChildMap.set(file.parent, [])
        idChildMap.get(file.parent).push(file.id)
    }

    // assuming files with a parent of -1 are roots
    const roots = idChildMap.get(-1)
    for (let file of roots) {
        let queue = []
        if (idChildMap.has(file)) queue = idChildMap.get(file)
        let fileSize = idSizeMap.get(file)
        while(queue.length != 0) {
            let curr = queue.pop()
            if (idChildMap.has(curr)) queue = queue.concat(idChildMap.get(curr))
            fileSize += idSizeMap.get(curr)
        }
        if (fileSize > largestFileSize) largestFileSize = fileSize
    }

    return largestFileSize
}


function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

const testFiles = [
    { id: 1, name: "Document.txt", categories: ["Documents"], parent: 3, size: 1024 },
    { id: 2, name: "Image.jpg", categories: ["Media", "Photos"], parent: 34, size: 2048 },
    { id: 3, name: "Folder", categories: ["Folder"], parent: -1, size: 0 },
    { id: 5, name: "Spreadsheet.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 4096 },
    { id: 8, name: "Backup.zip", categories: ["Backup"], parent: 233, size: 8192 },
    { id: 13, name: "Presentation.pptx", categories: ["Documents", "Presentation"], parent: 3, size: 3072 },
    { id: 21, name: "Video.mp4", categories: ["Media", "Videos"], parent: 34, size: 6144 },
    { id: 34, name: "Folder2", categories: ["Folder"], parent: 3, size: 0 },
    { id: 55, name: "Code.py", categories: ["Programming"], parent: -1, size: 1536 },
    { id: 89, name: "Audio.mp3", categories: ["Media", "Audio"], parent: 34, size: 2560 },
    { id: 144, name: "Spreadsheet2.xlsx", categories: ["Documents", "Excel"], parent: 3, size: 2048 },
    { id: 233, name: "Folder3", categories: ["Folder"], parent: -1, size: 4096 },
];

console.assert(arraysEqual(
    leafFiles(testFiles).sort((a, b) => a.localeCompare(b)),
    [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]
));

console.assert(arraysEqual(
    kLargestCategories(testFiles, 3),
    ["Documents", "Folder", "Media"]
));

console.assert(largestFileSize(testFiles) == 20992)
