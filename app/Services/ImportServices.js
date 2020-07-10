'use strict'
const Excel = use('exceljs')
// const Sekolah = use('App/Models/Sekolah')
// const Kepsek  = use('App/Models/Kepsek')

class ImportService {
  static async ImportClassification(filelocation) {
    var workbook = new Excel.Workbook()

    workbook = await workbook.xlsx.readFile(filelocation)

    let explanation = workbook.getWorksheet('Sheet 1') // get sheet name

    let colComment = explanation.getColumn('C') //column name

    colComment.eachCell(async (cell, rowNumber) => {
      if (rowNumber >= 11) {
        let sekolah = explanation.getCell('B' + rowNumber).value //get cell and the row
        let kode = explanation.getCell('C' + rowNumber).value
        let nama = explanation.getCell('D' + rowNumber).value
        let nip = explanation.getCell('E' + rowNumber).value

        //custom field name in database to variable
        let inputSekolah = {
          nama_sekolah: sekolah,
          kode_sekolah: kode
        }

        let inputNama = {
          nama_kepsek: nama,
          nip: nip,
          id_sekolah: kode
        }

        // let resSekolah = await Sekolah.create(inputSekolah)

        // inputNama.id_sekolah = resSekolah.id
        // let resNama = await Kepsek.create(inputNama)
        console.log('inputSekolah', inputSekolah)
      }
    })
  }
}

module.exports = ImportService
