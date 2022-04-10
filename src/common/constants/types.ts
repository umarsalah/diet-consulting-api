import { Answers } from 'src/modules/answer/answer.model';
import { ROLES } from './enums';

export type User = {
  id: number;
  email: string;
  userName: string;
  role: ROLES;
  token: string;
};

export type Question = {
  question: {
    id: number;
    title: string;
    description: string;
    isAnswered: boolean;
  };
  answers: Answers[];
  draft: Answers;
};
