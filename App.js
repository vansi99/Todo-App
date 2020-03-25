import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoScreen from './src/screens/TodoScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Todo">
                <Stack.Screen
                    name="Todo"
                    component={TodoScreen}
                    options={{
                        title: "My Todo",
                        headerStyle: {
                            backgroundColor: "red",
                        },
                        headerTitleStyle: {
                            color: "yellow",
                            fontSize: 25
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
