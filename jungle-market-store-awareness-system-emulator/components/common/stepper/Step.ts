import styled, { css } from "styled-components";

import Check from "../icons/Check";
import Cross from "../icons/Cross";

import StepIconJoiner from "./StepIconJoiner";
import StepIconCircle from "./StepIconCircle";
import StepTitle from "./StepTitle";

type Status = "success" | "warning" | "error";

const states = {
  success: css`
    ${StepIconCircle}, ${StepIconJoiner} {
      background-color: #d9e9d8;
      color: #238d48;
    }
    &:first-child {
      ${StepIconCircle}, ${StepIconJoiner} {
        background-color: #238d48;
        color: white;
      }
      ${StepTitle} {
        color: #238d48;
      }
    }
    ${Cross} {
      display: none;
    }
  `,

  warning: css`
    ${StepIconCircle}, ${StepIconJoiner} {
      background-color: #ffe1c0;
      color: #d68227;
    }
    &:first-child {
      ${StepIconCircle}, ${StepIconJoiner} {
        background-color: #d68227;
        color: white;
      }
      ${StepTitle} {
        color: #d68227;
      }
    }
    ${Cross} {
      display: none;
    }
  `,

  error: css`
    ${StepIconCircle}, ${StepIconJoiner} {
      background-color: #ffbdbd;
      color: #b80000;
    }
    &:first-child {
      ${StepIconCircle}, ${StepIconJoiner} {
        background-color: #b80000;
        color: white;
      }
      ${StepTitle} {
        color: #b80000;
      }
    }
    ${Check} {
      display: none;
    }
  `
};

interface IProps {
  status: Status;
}

const Step: any = styled.li<IProps>`
  color: #4a4a4a;
  display: contents;
  letter-spacing: -0.01375em;
  line-height: 1.375;

  &:last-child ${StepIconJoiner} {
    display: none;
  }

  ${({ status }) => states[status] || states.success}
`;

export default Step;

