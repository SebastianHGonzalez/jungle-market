import useI18n from "hooks/useI18n";

type Fillers = {
  [key: string]: string | number;
};

interface Props {
  id: string;
  fallback?: string;
  fillers?: Fillers;
}

const fillTagRegex = /\${(.*?)}/g; // it matches all tags in a string ex. '${foo}'
const fillTagCleanupRegex = /[a-zA-Z0-9]+/g; // it cleans up tag sintax ex. '${foo}' => 'foo'

/**
 * Replaces string tags with values in provided as fillers
 * ex. "a ${foo} is a ${baz}", { foo: "dog", baz: "canine"} => "a dog is a canine"
 *
 * @param {string} message
 * @param {{[key: string]: string}} fillers
 * @returns {string} filled message
 */
function fillMessage(message: string, fillers: Fillers) {
  return (message.match(fillTagRegex) || [])
    .map((fillTag) => ({
      fillTag,
      fillerKey: fillTag.match(fillTagCleanupRegex)?.[0],
    }))
    .reduce((partiallyFilledMessage, { fillTag, fillerKey }) => {
      const v = fillerKey && fillers[fillerKey];
      return v
        ? partiallyFilledMessage.replace(fillTag, v.toString())
        : partiallyFilledMessage;
    }, message);
}

function I18n({ id, fallback, fillers = {} }: Props) {
  const { messages } = useI18n();

  const message = (messages && messages[id]) || fallback || id;

  return <>{fillMessage(message, fillers)}</>;
}

export default I18n;
