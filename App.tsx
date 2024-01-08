/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {RealmContext, Task} from './models/Task';
import {BSON} from 'realm';

const {useQuery, useRealm} = RealmContext;

function App(): JSX.Element {
  const realm = useRealm();
  const tasks = useQuery(Task);

  const addTask = useCallback(() => {
    realm.write(() => {
      realm.create('Task', {
        _id: new BSON.ObjectId(),
        title: 'Walk the dog',
        description: 'Bring an umbrella',
      });
    });
  }, [realm]);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm]);

  console.log('render');

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <Text>{`${item.title} - ${item.description}`}</Text>
        )}
      />
      <TouchableOpacity style={{backgroundColor: 'yellow'}} onPress={addTask}>
        <Text>{'New Task'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
