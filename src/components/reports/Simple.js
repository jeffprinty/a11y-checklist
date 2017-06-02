import React from 'react';
import { array } from 'prop-types';

const SimpleReport = ({ reportCard, checkValues, notApplicable }) => (
  <table className="output">
    <thead>
      <tr>
        <th>Section</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {
        reportCard.map((item, i) => (
          <tr key={ i }>
            <td>
              {item.key} - {item.wuhcag_summary}
            </td>
            <td>
              {
                item.data.testing.checklist.map((check, q) => {
                  const key = `${item.key}_${q}`;
                  const nA = notApplicable.includes(key);
                  const isChecked = checkValues.includes(key);
                  return (
                    <a key={ q } href={ `#${item.key}` } title={ check.replace(/<(?:.|\n)*?>/gm, '') }>
                      { !nA && isChecked ? '✔' : '✖️' }
                      { nA && '➖' }
                    </a>
                  );
                })
              }
            </td>
          </tr>
          ))
      }
    </tbody>
  </table>
);

SimpleReport.propTypes = {
  checkValues: array.isRequired,
  notApplicable: array.isRequired,
  reportCard: array.isRequired
};

export default SimpleReport;
