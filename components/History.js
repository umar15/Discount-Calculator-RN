import React from "react";
import { View, Text, Button } from "react-native";

const History = ({ route }) => {
	const history = route.params.history;
	console.log(history);
	return (
		<View>
			<Text>History Component</Text>
			<View>
				{history.map((hist) => (
					<View>
						<View>Original Price: {hist.originalPrice}$</View>
						<View>Discount Percentage: {hist.discoutPercentage}%</View>
						<View>Total: {hist.total}$</View>
						<Button title="x" />
					</View>
				))}
			</View>
		</View>
	);
};

export default History;
