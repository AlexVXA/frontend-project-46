export default (val) => typeof val === 'object' && !Array.isArray(val) && val !== null;
