import _ from 'lodash';
import moment from 'moment';
import mongoose from 'mongoose';
import { IObjectId } from '../../src/types/global';
import { IWorkoutEvent } from '../../src/types/mealPlan';

import { WorkoutEvent } from '../../src/context/mealplan/schema/WorkoutEvent';

const { ObjectId: MongooseObjectId } = mongoose.mongo;

interface IWorkoutEventData {
  _id?: IObjectId;
  date?: Date;
  endTime?: Date;
  excercises?: [string];
  owner: IObjectId;
  startTime?: Date;
  workoutType?: string;
}

export function fakeWorkoutEvent(data: IWorkoutEventData): IWorkoutEvent {
  return new WorkoutEvent({
    _id: data._id ? new MongooseObjectId(data._id) : new MongooseObjectId(),
    date: data.date ? moment(data.date).unix() % 86400 : 17111.2222,
    endTime: data.endTime ? moment(data.endTime).unix() / 86400 : 25200,
    excercises: data.excercises || [],
    owner: data.owner,
    startTime: data.startTime ? moment(data.startTime).unix() / 86400 : 21600, // @TODO Here we should use current date
    workoutType: data.workoutType || null,
  });
}
