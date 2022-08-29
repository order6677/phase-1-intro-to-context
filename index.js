const createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (twoRows) => {
    return twoRows.map((row) => createEmployeeRecord(row))
}

const createTimeInEvent = (employeeDetails, day) => {
    const [date, hour] = day.split(' ')

    employeeDetails.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date })

    return employeeDetails
}

const createTimeOutEvent = (employeeDetails, day) => {
    const [date, hour] = day.split(' ')

    employeeDetails.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date })

    return employeeDetails
}

const hoursWorkedOnDate = (employeeDetails, dateFinder) => {

    const shiftIn = employeeDetails.timeInEvents.find((event) => {
        return event.date === dateFinder
    })

    const shiftOut = employeeDetails.timeOutEvents.find((event) => {
        return event.date === dateFinder
    })

    return (shiftOut.hour - shiftIn.hour) / 100
}

const wagesEarnedOnDate = (employeeDetails, dateFinder) => {
    const allWages = hoursWorkedOnDate(employeeDetails, dateFinder) * employeeDetails.payPerHour
    return parseFloat(allWages.toString())
}

const allWagesFor = (employeeDetails) => {
    let matchDates = employeeDetails.timeInEvents.map((event) => event.date)

    let payableEarning = matchDates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(employeeDetails, d)
    }, 0)

    return payableEarning
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    return srcArray.find((rec) => {
        return rec.firstName === firstName
    })
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce((memo, rec) => {
        return memo + allWagesFor(rec)
    }, 0)
}
