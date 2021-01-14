// ==UserScript==
// @name         PSU - DARS Clarified Credits Earned
// @namespace    https://thealiendrew.github.io/
// @version      1.0.0
// @description  This will show the total number of credits earned, and how much of the earned credits were taken from PSU or external sources, along with showing the total amount from external sources (which may not have been transferred).
// @author       AlienDrew
// @match        https://app.banner.pdx.edu/uachieve_selfservice/audit/read.html*
// @downloadURL  https://raw.githubusercontent.com/TheAlienDrew/PSU/master/Tampermonkey-Scripts/Degree%20Audit%20Reporting%20System/PSU-DARS-Clarified-Credits-Earned.user.js
// @grant        none
// ==/UserScript==

// (c) 2020 Andrew Larson
// This code is licensed under MIT license (see LICENSE for details)

let allCourseElementsWithDuplicatesAndZeroCreditAndInProgress = document.querySelectorAll('.takenCourse');
let allCoursesWithDuplicatesAndZeroCreditAndInProgress = [];
let allCoursesAndZeroCreditAndInProgress = [];
let allCoursesAndInProgress = [];
let finishedCourses = [];
let externalUni = {courses: 0, credits: 0};
let uni = {fromUni: {courses: 0, credits: 0}, fromTransfer: {courses: 0, credits: 0}};
let total = {used: {courses: 0, credits: 0}, unused: {courses: 0, credits: 0}};

/* A course object
 *
 * term
 * course
 * credit
 * grade
 * conditionCode (ccode)
 * description
 */

// change all elements to array of course objects with important information
for (let i = 0; i < allCourseElementsWithDuplicatesAndZeroCreditAndInProgress.length; i++) {
    let course = {term: '', course: '', credit: 0, grade: '', conditionCode: '', description: ''};

    let courseElement = allCourseElementsWithDuplicatesAndZeroCreditAndInProgress[i];

    // convert data
    for (let j = 0; j < courseElement.childElementCount; j++) {
        let courseDataElement = courseElement.children[j];
        let courseAriaLabel = courseDataElement.ariaLabel;
        let courseDataText = '';

        // description needs to be handled differently
        if (courseAriaLabel == 'description') {
            let descLines = courseDataElement.querySelectorAll('.descLine');
            let desc = '';

            // use newlines between each new line element
            for (let k = 0; k < descLines.length; k++) {
                let descLine = descLines[k].innerText.trim().replace(/\s\s+/g, ' ');

                if (desc.length > 0) desc += '\n' + descLine;
                else desc = descLine;
            }

            course.description = desc;
        } else {
            courseDataText = courseDataElement.innerText.trim().replace(/\s\s+/g, ' ');

            switch(courseAriaLabel) {
                case 'term': course.term = courseDataText; break;
                case 'course': course.course = courseDataText; break;
                case 'credit': course.credit = parseInt(courseDataText); break;
                case 'grade': course.grade = courseDataText; break;
                case 'condition code': course.conditionCode = courseDataText; break;
            }
        }
    }

    allCoursesWithDuplicatesAndZeroCreditAndInProgress.push(course);
}

// remove all duplicates
for (let i = 0; i < allCoursesWithDuplicatesAndZeroCreditAndInProgress.length; i++) {
    let checkingCourse = allCoursesWithDuplicatesAndZeroCreditAndInProgress[i];

    let alreadyExists = false;
    for (let j = 0; j < allCoursesAndZeroCreditAndInProgress.length; j++) {
        let doNotDuplicateCourse = allCoursesAndZeroCreditAndInProgress[j];

        if ((doNotDuplicateCourse.description == checkingCourse.description) && (doNotDuplicateCourse.term == checkingCourse.term)) alreadyExists = true;
    }

    if (!alreadyExists) allCoursesAndZeroCreditAndInProgress.push(checkingCourse);
}

// remove all zero-credit courses
for (let i = 0; i < allCoursesAndZeroCreditAndInProgress.length; i++) {
    let checkingCourse = allCoursesAndZeroCreditAndInProgress[i];

    if (checkingCourse.credit > 0) allCoursesAndInProgress.push(checkingCourse);
}

// remove all in-progress courses
for (let i = 0; i < allCoursesAndInProgress.length; i++) {
    let checkingCourse = allCoursesAndInProgress[i];

    if (checkingCourse.grade != 'RE') finishedCourses.push(checkingCourse);
}

// count the credits to the correct categories
for (let i = 0; i < finishedCourses.length; i++) {
    let checkingCourse = finishedCourses[i];
    let courseCredit = checkingCourse.credit;

    if (checkingCourse.grade == '--') {
        total.unused.courses++;
        total.unused.credits += courseCredit;
        externalUni.courses++;
        externalUni.credits += courseCredit;
    } else if (checkingCourse.grade.includes('T')) {
        total.used.courses++;
        total.used.credits += courseCredit;
        externalUni.courses++;
        externalUni.credits += courseCredit;
        uni.fromTransfer.courses++;
        uni.fromTransfer.credits += courseCredit;
    } else {
        total.used.courses++;
        total.used.credits += courseCredit;
        uni.fromUni.courses++;
        uni.fromUni.credits += courseCredit;
    }
}

// display results
let colorStyleLight = 'color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0.667)'
let colorStyleDark = 'color: rgb(0, 0, 0) !important; background-color: rgba(255, 255, 255, 0.667) !important'
let divStyleLight = 'display: inline-block; position: fixed; bottom: 10px; right: 10px; padding: 10px; border-radius: 10px; ' + colorStyleLight;
let divStyleDark = 'display: inline-block; position: fixed; bottom: 10px; right: 10px; padding: 10px; border-radius: 10px; ' + colorStyleDark;
let pStart = '<p style="margin: 0px !important; font-size: 10pt;">';
let pEnd = '</p>';
let titleStart = '<b style="font-size: 125%"><u>';
let titleEnd = '</b></u>';
let contentStart = '<i>';
let contentEnd = '</i>';
let newline = '<br>';
let divInnerHTML = pStart+titleStart+ 'External colleges/universities' +titleEnd+newline+contentStart +externalUni.credits+' credits (from '+externalUni.courses+' courses)' +contentEnd+pEnd+newline +
                   pStart+titleStart+ 'Not used at PSU' +titleEnd+newline+contentStart +total.unused.credits+' credits (from '+total.unused.courses+' courses)' +contentEnd+pEnd +
                   pStart+titleStart+ 'Transferred to PSU' +titleEnd+newline+contentStart +uni.fromTransfer.credits+' credits (from '+uni.fromTransfer.courses+' courses)' +contentEnd+pEnd +
                   pStart+titleStart+ 'Earned at PSU' +titleEnd+newline+contentStart +uni.fromUni.credits+' credits (from '+uni.fromUni.courses+' courses)' +contentEnd+pEnd+newline +
                   pStart+titleStart+ 'PSU Total' +titleEnd+newline+contentStart +total.used.credits+' credits (from '+total.used.courses+' courses)' +contentEnd+pEnd;
let clarifiedCreditsEarned = document.createElement('div');
clarifiedCreditsEarned.style = divStyleLight;
clarifiedCreditsEarned.innerHTML = divInnerHTML;
document.body.appendChild(clarifiedCreditsEarned);

// this fixes issues with Darkreader
setInterval(function() {
    let hadDarkreaderOn = document.head.innerHTML.includes('darkreader');
    let cssText = clarifiedCreditsEarned.style.cssText;
    if (hadDarkreaderOn && cssText.startsWith(divStyleLight)) clarifiedCreditsEarned.style.cssText = divStyleDark;
    else if (!hadDarkreaderOn && cssText.startsWith(divStyleDark)) clarifiedCreditsEarned.style.cssText = divStyleLight;
}, 100);
