import React from 'react';

import { F, Row, StyledCheckbox } from './shared';

const sentenceCase = txt => txt.charAt(0).toUpperCase() + txt.slice(1, txt.length);

const FilterBar = ({filterList, checkValues, onChange}) => (
  <div className="checkBar">
    <Row>
      <strong>Filters: </strong>
      <F flex={ 2 }>
        {
          filterList.map((item, i) => (
            <StyledCheckbox className="styledCheckbox" key={ i }>
              <input
                id={ `${item}_checkbox` }
                name={ item }
                type="checkbox"
                checked={ checkValues.includes(item) }
                onChange={ onChange.bind(this) }
                value={ item }
              />
              <span className="check" />
              <label htmlFor={ `${item}_checkbox` }>{ sentenceCase(item) }</label>
            </StyledCheckbox>
            ))
        }
      </F>
    </Row>
  </div>
);

export default FilterBar;
