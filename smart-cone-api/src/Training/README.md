This folder will organize data, services and controllers related to Training activities.

This may be broken up further in the future, but for now, we will expose all of this info in a module.

# Cone

A cone represents a physical location in the field for a particular cone.

## Details

Each cone has an offset defined as the positional offset from the origin. The origin is defined as the location of the
first cone.

Each cone has the following properties:

*   id: number, a unique identifier
*   position: Point, represents the offset from origin, measured in yards

## Example

The origin cone should always be the following:

    cone {
        id: 1,
        position: 0, 0
    }

Following cones should be relative to the origin:

    cone {
        id: 2,
        position: 5, 5 # this cone is 5 yards to the east and 5 yards north of the first cone
    }

# Field

A field represents a list of cones which can be created, saved, loaded and selected when starting a training session

## Details

A field has an array of cones. Each of the cones has a position relative to the first cone. Using this information it should be fairly easy to render a graphical view of the field.

Each field should be tailored to actual real-life fields (football vs. soccer) and specific training setups. A field describes how the user is going to physically place the fields in the real-world.

## Example

    field: {
        cones: [
            {
                id: 1,
                position: 0, 0 # Note that cone id 1, should always be at 0,0
            },
            {
                id: 2,
                position: 0, 10 # 10 yards north of the origin
            },
            {
                id: 3,
                position: 8, 10 # 10 yards north of origin, 8 yards east
            },
            {
                id: 4,
                position: 8, 15 # 15 yards north of origin, 8 yards east
            }
        ]
    }

# Course

A course represents some combination of actions, and a complete or subset of a specific field.

## Details

A course has a reference to the field it is connected to, and has a list of cones which are to be included. This allows the user to create courses which omit specific cones, which is useful for flexibility in the system. The user also will select the actions which will occur between cones.

    course: {
        field: {  # This is always loaded directly from a saved field
            cones: [
            {
                id: 1,
                position: 0, 0 # Note that cone id 1, should always be at 0,0
            },
            {
                id: 2,
                position: 0, 10 # 10 yards north of the origin
            },
            {
                id: 3,
                position: 8, 10 # 10 yards north of origin, 8 yards east
            },
            {
                id: 4,
                position: 8, 15 # 15 yards north of origin, 8 yards east
            }
            ]
        },
        course: {
            cones: [1, 2, 3, 4], # in this case we are using all cones available from the field
            actions: [ # list of actions
                {
                    from: 1,    # each cone has a start, and end cone, along with an action
                    to: 2,
                    action: "run"
                },
                {
                    from: 2,
                    to: 3,
                    action: "jog"
                },
                {
                    from: 3,
                    to: 4,
                    action: "sprint"
                }
            ]
        }
    }

In the above example we are using all four cones. From 1->2 we are running, from 2->3 we are jogging, from 3-> we are sprinting

NOTE: Something not covered here, but will need to be fully discussed, in additional rules for courses. We may want that the last cone should always be linked up with the start cone.

NOTE: Start cone in this case (cone id #1) will probably end up being the base-station.
