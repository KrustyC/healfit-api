import _ from 'lodash';
import moment from 'moment';
import mongoose from 'mongoose';
import { IObjectId } from '../../src/types/global';
import { IWorkoutEvent } from '../../src/types/mealPlan';

import { WorkoutEvent } from '../../src/context/mealplan/schema/WorkoutEvent';

const { ObjectId: MongooseObjectId } = mongoose.mongo;

interface IWorkoutEventData {
  _id?: IObjectId;
  endTime?: Date;
  excercises?: [string];
  owner: IObjectId;
  startTime?: Date;
  workoutType?: string;
}

export function fakeWorkoutEvent(data: IWorkoutEventData): IWorkoutEvent {
  return new WorkoutEvent({
    _id: data._id ? new MongooseObjectId(data._id) : new MongooseObjectId(),
    endTime: data.endTime || new Date(),
    excercises: data.excercises || [],
    owner: data.owner,
    startTime: data.startTime || new Date(),
    workoutType: data.workoutType || null,
  });
}
