/**
 * Generate and set id attribute to headings using its own text,
 * then return an Array contains toc headings
 * @param  {String} selector A selector for the element that wrap the article or content
 * @param  {Object} options Optional user options for configuration
 */
const getToc = (selector, options) => {
  const contentNode = document.querySelector(selector);
  if (!contentNode) return;

  const toc = { headers: [], headerSelector: "" };

  // Configurations
  const settings = {};
  const defaults = {
    levels: "h2, h3, h4, h5, h6",
    appendAnchor: true,
    anchorClass: "toc-anchor",
    headerClass: "toc-header",
  };

  /**
   * Configure settings if options are provided
   * @param  {Object} options The user options
   */
  const configSettings = (options) => {
    for (var prop in defaults) {
      // return true if prop is a direct property of the object
      // true - overide default config
      // false - use default config
      settings[prop] = Object.hasOwn(options, prop)
        ? options[prop]
        : defaults[prop];
    }
  };

  /**
   * Generate ID using heading text
   * @param  {node} el The heading element
   */
  const GenerateID = (el) => {
    return el.innerText.toLowerCase().replace(/[^A-Za-z0-9]/g, "-");
  };

  // Configure settings
  configSettings(options || {});

  // Set toc header selector
  toc.headerSelector = `${selector} .${settings.headerClass}`;

  contentNode.querySelectorAll(settings.levels).forEach((el) => {
    let id = el.getAttribute("id") || GenerateID(el);

    // Set ID
    el.setAttribute("id", id);

    // Set header class
    el.classList.add(settings.headerClass);

    // Append extracted heading to toc
    // h2 to indent 1, h3 to indent 2 etc.
    toc.headers.push({
      id: id,
      text: el.innerText,
      indent: parseInt(el.tagName.slice(1)) - 1,
    });

    // Create anchor
    if (settings.appendAnchor) {
      const anchor = document.createElement("a");
      anchor.classList.add(settings.anchorClass);
      anchor.href = `#${id}`;
      anchor.innerText = "#";
      el.appendChild(anchor);
    }
  });

  return toc;
};

export default getToc;
