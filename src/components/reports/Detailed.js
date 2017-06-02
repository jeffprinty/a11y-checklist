import React from 'react';
import { array, object } from 'prop-types';
import {
    Accordion, AccordionItem,
    AccordionItemTitle, AccordionItemBody
} from 'react-accessible-accordion';

import { F, Row } from '../shared';

const DetailedReport = ({ reportCard, checkValues, notApplicable, owners, notes }) => (
  <div className="reportCard">
    <Accordion accordion={ false }>
      {
        reportCard.map((item, i) => (
          <AccordionItem key={ i }>
            <AccordionItemTitle className="accordionTitle">
              <Row>
                <F flex={ 3 }>
                  <h3>{item.key} - {item.wuhcag_summary}</h3>
                </F>
                <F flex={ 1 } className="rightAlign">
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
                </F>
              </Row>
            </AccordionItemTitle>
            <AccordionItemBody>
              <table className="reportTable">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th className="center">Owner</th>
                    <th className="center">Notes</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                    item.data.testing.checklist.map((check, q) => {
                      const key = `${item.key}_${q}`;
                      const nA = notApplicable.includes(key);
                      const isChecked = checkValues.includes(key);
                      return (
                        <tr key={ q }>
                          <td className="title">
                            <a key={ q } href={ `#${item.key}` } title={ check.replace(/<(?:.|\n)*?>/gm, '') }>
                              { check.replace(/<(?:.|\n)*?>/gm, '') }
                            </a>
                          </td>
                          <td className="owner">
                            { owners[key] }
                          </td>
                          <td className="notes">
                            { notes[`${item.key}_${q}`] }
                          </td>
                          <td className="status rightAlign">
                            { !nA && isChecked ? '✔' : '✖️' }
                            { nA && '➖' }
                          </td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </AccordionItemBody>
          </AccordionItem>
        ))
      }
    </Accordion>
  </div>
);

DetailedReport.propTypes = {
  checkValues: array.isRequired,
  notApplicable: array.isRequired,
  reportCard: array.isRequired,
  owners: object.isRequired,
  notes: object.isRequired
};

export default DetailedReport;
