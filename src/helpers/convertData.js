function convertData(data, type) {
    const dataConverter = data[type].map(item => {
        return {
            date: item[0],
            [type]: item[1]
        }
    })

    return dataConverter
}

export { convertData }