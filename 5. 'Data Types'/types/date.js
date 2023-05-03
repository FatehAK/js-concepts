//# Date
console.log('=======================Date=======================');
/*
Default JS date format -> YYYY-MM-DDTHH:mm:ss.sssZ
* YYYY - year (0000 to 9999)
* MM - month (01 to 12). Defaults to 01.
* DD - day of the month (01 to 31). Defaults to 01.
* T - is a literal character, which indicates the beginning of the time part of the string.
* HH - hour (00 to 23). 24:00:00 is allowed, and is interpreted as midnight at the beginning of the next day. Defaults to 00.
* mm - minute (00 to 59). Defaults to 00.
* ss - second (00 to 59). Defaults to 00.
* sss - millisecond (000 to 999). Defaults to 000.
* Z - timezone offset, which can either be the literal character Z (indicating UTC), or + or - followed by HH:mm, the offset in hours and minutes from UTC. When the time zone offset is absent, date-only forms are interpreted as a UTC time and date-time forms are interpreted as local time.
*/

//>>Date(...components || datestring) constructor
/*!!!!!!!
Any missing fields are given the lowest possible value (1 for day and 0 for every other component).

If any parameter overflows its defined bounds, it "carries over". For example, if a monthIndex greater than 11 is passed in, those months will cause the year to increment; if a minutes greater than 59 is passed in, hours will increment accordingly, etc. Therefore, new Date(1990, 12, 1) will return January 1st, 1991; new Date(2020, 5, 19, 25, 65) will return 2:05 A.M. June 20th, 2020.

Similarly, if any parameter underflows, it "borrows" from the higher positions. For example, new Date(2020, 5, 0) will return May 31st, 2020.
*/
console.log(new Date()); // Wed May 03 2023 17:29:25 GMT+0530 (India Standard Time)
console.log(new Date('December 17, 1995 03:24:00')); // DISCOURAGED: may not work in all runtimes (Sun Dec 17 1995 03:24:00 GMT+0530 (India Standard Time))
console.log(new Date('1995-12-17T03:24:00')); // This is ISO8601-compliant and will work reliably (Sun Dec 17 1995 03:24:00 GMT+0530 (India Standard Time))
console.log(new Date(1995, 11, 17)); // the month is 0-indexed (Sun Dec 17 1995 00:00:00 GMT+0530 (India Standard Time))
console.log(new Date(1995, 11, 17, 3, 24, 0)); // passing individual params (Sun Dec 17 1995 03:24:00 GMT+0530 (India Standard Time))
console.log(new Date(628021800000)); // passing epoch timestamp (Sun Nov 26 1989 00:00:00 GMT+0530 (India Standard Time)

//>>Date.UTC(...components || datestring)
// accepts parameters similar to the Date constructor, but treats them as UTC
// returns the number of milliseconds since epoch
console.log(new Date(Date.UTC(1995, 11, 17, 3, 24, 0))); // Sun Dec 17 1995 08:54:00 GMT+0530 (India Standard Time)

//>>Date.parse('datestring')
// parses a datestring in returns the number of UTC milliseconds since epoch
// useful for setting date values based on string values, for example in conjunction with the setTime() method and the Date object.
console.log(Date.parse('2011-10-10T14:48:00')); // 1318238280000

//>>Date.now()
// returns the number of milliseconds elapsed since the epoch UTC
console.log(Date.now()); // 1683124314363
// example using it to calculate time delta
function runTimer() {
  const start = Date.now();
  console.log('starting timer...');
  setTimeout(() => {
    const millis = Date.now() - start;
    console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
    // Expected output: "seconds elapsed = 2"
  }, 2000);
}
runTimer();

//>>toString methods
const date = new Date('2020-05-12T23:50:21.817Z');
// returns a string representing the specified Date object interpreted in the local timezone
console.log(date.toString()); // Wed May 13 2020 05:20:21 GMT+0530 (India Standard Time)

// returns the date portion of a Date object interpreted in the local timezone
console.log(date.toDateString()); // Wed May 13 2020

// returns the time portion of a Date object interpreted in the local timezone
console.log(date.toTimeString()); // 05:20:21 GMT+0530 (India Standard Time)

// returns a string in simplified extended ISO format (ISO 8601), which is always 24 or 27 characters long (YYYY-MM-DDTHH:mm:ss.sssZ or ±YYYYYY-MM-DDTHH:mm:ss.sssZ, respectively). The timezone is always zero UTC offset, as denoted by the suffix Z
console.log(date.toISOString()); // 2020-05-12T23:50:21.817Z

// returns a string representation of the Date object.
console.log(date.toJSON()); // 2020-05-12T23:50:21.817Z

// returns a string representing the given date using the UTC time zone
console.log(date.toUTCString()); // Tue, 12 May 2020 23:50:21 GMT

// internally calls the Intl API for formatting a date string
// Options: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options
console.log(date.toLocaleString()); // 13/05/2020, 05:20:21
console.log(date.toLocaleDateString()); // 13/05/2020
console.log(date.toLocaleTimeString()); // 05:20:21

//>>getters
// returns the year in local/UTC time
console.log(date.getFullYear()); // 2020
console.log(date.getUTCFullYear()); // 2020

// returns the month in local/UTC time
console.log(date.getMonth()); // 4
console.log(date.getUTCMonth()); // 4

// returns the day of the month in local/UTC time
console.log(date.getDate()); // 13
console.log(date.getUTCDate()); // 12

// returns day of the week in local/UTC time
console.log(date.getDay()); // 3 (Wednesday)
console.log(date.getUTCDay()); // 2 (Tuesday)

// returns the hour in local/UTC time
console.log(date.getHours()); // 5
console.log(date.getUTCHours()); // 23

// returns the mintutes in local/UTC time
console.log(date.getMinutes()); // 20
console.log(date.getUTCMinutes()); // 50

// returns the seconds in local/UTC time
console.log(date.getSeconds()); // 21
console.log(date.getUTCSeconds()); // 21

// returns the milliseconds in local/UTC time
console.log(date.getMilliseconds()); // 817
console.log(date.getUTCMilliseconds()); // 817

//  returns the difference, in minutes, between this date as evaluated in the UTC time zone, and the same date as evaluated in the local time zone.
console.log(date.getTimezoneOffset()); // -330

//>>setters
// modfify the date object in-place and returns its new timestamp
/*
date.setDate()
date.setFullYear()
date.setHours()
date.setMilliseconds()
date.setMinutes()
date.setMonth()
date.setSeconds()
date.setTime()
date.setUTCDate()
date.setUTCFullYear()
date.setUTCHours()
date.setUTCMilliseconds()
date.setUTCMinutes()
date.setUTCMonth()
date.setUTCSeconds()
*/
//#
