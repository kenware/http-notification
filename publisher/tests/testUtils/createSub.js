import Models from '../../server/models';

const createSub = async (topic, url) => {
  const sub = await Models.Subscription.findOrCreate({
    where: {
      topicId: topic.id,
      url,
    },
  });
  return sub;
};

export default createSub;
