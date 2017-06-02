import React from 'react';
import styled from 'styled-components';
import { string, number, array, func, object } from 'prop-types';

import Trinary from './Trinary';

const ChecklistRow = styled.tr`
  opacity: ${props => props.notApplicable ? '0.3' : 1};
`;

const ChecklistItem = ({
  parentKey, itemIndex, title,
  checkedItems, notApplicable,
  notes, owners, checkToggle,
  updateNotes, toggleNotes,
  cycleCheck, updateOwner
}) => {
  const itemId = `${parentKey}_${itemIndex}`;
  const hasNote = typeof notes[itemId] !== 'undefined';
  return (
    <ChecklistRow notApplicable={ notApplicable.includes(itemId) }>
      <td className="checkbox">
        <div className="hidden">
          <input
            id={ `checklist_${itemId}` }
            checked={ checkedItems.includes(itemId) }
            onChange={ checkToggle }
            value={ itemId }
            type="checkbox"
          />
        </div>
        <Trinary
          title={ itemId }
          onClick={ cycleCheck }
          index={ itemIndex }
          checked={ checkedItems.includes(itemId) }
          indeterminate={ notApplicable.includes(itemId) }
        />
      </td>
      <td>
        <a name={ `${itemId}` }>
          <label
            htmlFor={ `checklist_${itemId}` }
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </a>
        { hasNote &&
          <div className="notesWrap">
            <u>{ `${itemId} Notes` }</u>
            <textarea
              name={ `${itemId}` }
              value={ notes[`${itemId}`] }
              onChange={ updateNotes.bind(this) }
            />
          </div>
        }
      </td>
      <td className="notes">
        <button
          name={ `${itemId}` }
          title="Show notes for this task"
          className="noteButton"
          onClick={ toggleNotes.bind(this) }
        />
      </td>
      <td className="owner">
        <input
          type="text"
          title="Who is taking ownership?"
          name={ `${itemId}` }
          value={ owners[`${itemId}`] }
          onChange={ updateOwner.bind(this) }
        />
      </td>
    </ChecklistRow>
  );
};

ChecklistItem.propTypes = {
  parentKey: string.isRequired,
  itemIndex: number.isRequired,
  title: string.isRequired,
  checkedItems: array.isRequired,
  notApplicable: array.isRequired,
  notes: object.isRequired,
  owners: object.isRequired,
  cycleCheck: func.isRequired,
  updateNotes: func.isRequired,
  toggleNotes: func.isRequired,
  checkToggle: func.isRequired,
  updateOwner: func.isRequired
};

export default ChecklistItem;
