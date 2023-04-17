"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Course {
    constructor(field, segmentCollection, conesSubset, name) {
        this.field = field;
        this.segmentCollection = segmentCollection;
        this.conesSubset = conesSubset;
        this.name = name;
        this.field = field;
        this.field.cones = field.cones;
    }
}
exports.Course = Course;
class CourseSegment {
    constructor(from, to, action) {
        this.from = from;
        this.to = to;
        this.action = action;
    }
}
exports.CourseSegment = CourseSegment;
class SegmentCollection {
    constructor(segments) {
        this.segments = segments;
    }
}
exports.SegmentCollection = SegmentCollection;
//# sourceMappingURL=course.js.map