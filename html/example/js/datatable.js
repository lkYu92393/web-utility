// const dataSrc = [
//     { title: "Hello", amount: 1999, hidden: 123, startDate: "2011-01-01", endDate: "2012-01-02" },
//     { title: "World", amount: 6548, hidden: 123, startDate: "2012-01-01", endDate: "2012-01-02" },
//     { title: "Mantis", amount: 6135, hidden: 123, startDate: "2014-01-01", endDate: "2012-01-02" },
//     { title: "Gonna", amount: 4134, hidden: 123, startDate: "2016-01-01", endDate: "2012-01-02" },
//     { title: "Mojo", amount: 7245, hidden: 123, startDate: "2018-01-01", endDate: "2012-01-02" },
//     { title: "Cat", amount: 2315, hidden: 123, startDate: "2020-01-01", endDate: "2012-01-02" },
//     { title: "Dog", amount: 2346, hidden: 123, startDate: "2021-01-01", endDate: "2012-01-02" },
// ]

const firstNameList = ['Liam','Noah','Oliver','James','Elijah','Mateo','Theodore','Henry','Lucas','William']
const lastNameList = ['Smith','Johnson','Brown','Jones','Miller','Davis','Martinez','Lopez','Thomas','Moore']
const randomDateGen = (startYear) => {
    const year = (Math.round(Math.random() * 10) + startYear).toString()
    const month = (Math.round(Math.random() * 11) + 1).toString()
    const day = (Math.round(Math.random() * 27) + 1).toString()
    // const date = (year + (month.length == 1 ? '-0' : '-') + month + (day.length == 1 ? '-0':'-') + day)
    const date = year + '-' + month.padStart(2, '0') + '-'  + day.padStart(2, '0')
    return date
}

const dataSrcFunc = (noOfRecord) => {
    return Array(noOfRecord).fill().map((_, index) => {
        return {
            id: index,
            firstName: firstNameList[Math.round(Math.random() * (firstNameList.length-1))],
            lastName: lastNameList[Math.round(Math.random() * (lastNameList.length - 1))],
            age: Math.round(Math.random() * 30) + 18,
            startDate: randomDateGen(2000),
            endDate: randomDateGen(2011),
        }
    })
}

const titleDict = {
}

let datatableTarget = null

const DOMContentLoadedHandler = () => {
    const convertToDate = (dateStr, format) => {
        switch (format) {
            case 'yyyy-MM-dd':
                const temp = dateStr.split('-')
                return new Date(`${temp[0]}-${temp[1]}-${temp[2]}`)
            default:
                return new Date(dateStr)
        }
    }

    $.extend($.fn.dataTable.ext.type.order, {
        "date-sort-asc": function (val_1, val_2) {
            const temp_1 = convertToDate(val_1, 'yyyy-MM-dd')
            const temp_2 = convertToDate(val_2, 'yyyy-MM-dd')
            return temp_1 > temp_2 ? 1 : -1
        },
        "date-sort-desc": function (val_1, val_2) {
            const temp_1 = convertToDate(val_1, 'yyyy-MM-dd')
            const temp_2 = convertToDate(val_2, 'yyyy-MM-dd')
            return temp_1 > temp_2 ? -1 : 1
        }
    });

    datatableTarget = new DataTable('#example', {
        layout: {
            // topStart: 'info',
            topEnd: {
                search: {
                    placeholder: 'Search'
                }
            }
        },
        data: dataSrcFunc(200),
        columns: [
            { data: 'id', visible: false },
            { data: (row) => { return `${row.firstName} ${row.lastName}`}, width: '30%' },
            { data: 'age' },
            { data: 'startDate' },
            { data: 'endDate' },
        ],
        columnDefs: [
            { target: [3, 4], type: 'date-sort' }
        ],
        scrollCollapse: true,
        scrollY: '400px'
    })
    $.fn.DataTable.ext.pager.numbers_length = 3;
}

document.addEventListener("DOMContentLoaded", DOMContentLoadedHandler)