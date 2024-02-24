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

function leafFiles(files) {
    const idNameMap = new Map()
    files.forEach(file => (idNameMap.set(file.id, file.name)))
    files.forEach(file => {if (idNameMap.has(file.parent)) idNameMap.delete(file.parent)})
    return Array.from(idNameMap.values())
}

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

    console.log(largestFileSize)
}

console.log(largestFileSize(testFiles))