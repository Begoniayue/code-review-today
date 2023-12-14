import * as xlsx from 'xlsx'

export const jsonToExcel = (options = { list: [], header: {}, fileName: '', bookType: '' }) => {
  if (options.header) {
    options.list = options.list.map(item => {
      const obj = {}
      for (const key in item) {
        if (options.header[key]) {
          obj[options.header[key]] = item[key]
        } else {
          // obj[key] = item[key]
        }
      }
      return obj
    })
  }
  console.log(options.list)
  // 1. 创建一个工作簿 workbook
  const workBook = xlsx.utils.book_new()
  // 2. 创建工作表 worksheet
  const workSheet = xlsx.utils.json_to_sheet(options.list)
  // 3. 将工作表放入工作簿中
  xlsx.utils.book_append_sheet(workBook, workSheet)
  // 4. 生成数据保存
  xlsx.writeFile(workBook, options.fileName || `${new Date().valueOf()}.xlsx`, {
    bookType: options.bookType || 'xlsx',
  })
}
