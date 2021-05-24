import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider, List } from '@material-ui/core';
import Search from './../search';
import Category from './../category';
import Annotation from './../annotation';
import Head from './../head';

const Drawer = ({ filterResults, annotations, selected, open, openAll, openSearch, dispatch }) => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<List>
					<Head
						openAll={openAll}
						openSearch={openSearch}
						dispatch={dispatch}
						annotations={annotations}
					/>
					{openSearch && (
						<>
							<Divider />
							<Search dispatch={dispatch} />
						</>
					)}

					<Divider />
					{filterResults.map((category, index) => (
						<div key={index}>
							{index > 0 && !open[index - 1] && open[index] && <Divider />}
							<Category
								category={category}
								badgeContent={annotations[category.id] ? annotations[category.id].length : 0}
								selected={selected}
								open={open}
								index={index}
								dispatch={dispatch}
							/>
							<Annotation
								annotations={annotations[category.id]}
								index={index}
								category={category}
								open={open}
								dispatch={dispatch}
							/>
							{open[index] && <Divider />}
						</div>
					))}
				</List>
			</Grid>
		</Grid>
	)
};

Drawer.propTypes = {
	filterResults: PropTypes.array,
	annotations: PropTypes.object,
	selected: PropTypes.object,
	open: PropTypes.array,
	openAll: PropTypes.bool,
	openSearch: PropTypes.bool,
	dispatch: PropTypes.func.isRequired
}
Drawer.defaultProps = {
	filterResults: [],
	annotations: {},
	selected: {},
	open: [],
	openAll: false,
	openSearch: false,
	dispatch: () => { }
}

export default Drawer;
