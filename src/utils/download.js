const download = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const handleDownload = json => {
    download(JSON.stringify(json), "export.json", "text/plain");
}

export { handleDownload }