import Sequelize, { QueryTypes } from 'sequelize';

import Material from '../models/Material';

class MaterialRawController {
  // Index

  async balance(req, res) {
    try {
      const result = await Material.sequelize.query('SELECT m.req_maintenance, i.material_id, mat.name, mat.unit, SUM(i.quantity) as entrySum, t1.restrictSum, t2.releaseSum, t3.outSum, (t2.releaseSum-t1.restrictSum+SUM(i.quantity)) as Released, (t1.restrictSum-t2.releaseSum) as Restricted, (t2.releaseSum-t1.restrictSum+SUM(i.quantity)-t3.outSum) as commonBalance, (SUM(i.quantity)-t3.outSum) as totalBalance FROM ((((materials_in_items as i left join materials as mat on i.material_id=mat.id) left join materials_in as m on i.material_in_id=m.id) left join (SELECT ires.material_id, SUM(ires.quantity) as restrictSum, res.material_in_id FROM materials_restrict_items as ires left join materials_restrict as res on ires.material_restrict_id=res.id GROUP BY ires.material_id, res.material_in_id) as t1 on i.material_id=t1.material_id AND m.id=t1.material_in_id) left join (SELECT irel.material_id, SUM(irel.quantity) as releaseSum, rel.material_in_id FROM materials_release_items as irel left join materials_release as rel on irel.material_release_id=rel.id GROUP BY irel.material_id, rel.material_in_id) as t2 on i.material_id=t2.material_id AND m.id=t2.material_in_id) left join (SELECT iout.material_id, SUM(iout.quantity) as outSum, o.req_maintenance FROM materials_out_items as iout left join materials_out as o on iout.material_out_id=o.id GROUP BY iout.material_id, o.req_maintenance) as t3 on i.material_id=t3.material_id AND m.req_maintenance=t3.req_maintenance GROUP BY i.material_id, m.req_maintenance', { type: QueryTypes.SELECT });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async consumeOutput(req, res) {
    try {
      const result = await Material.sequelize.query(`select date(o.created_at) as createdAtOut, DATE_FORMAT(DATE(o.created_at),'%d/%m/%Y') as createdAtOutBr, oi.material_id as materialIdOut, o.req_maintenance as reqMaintenance, o.place as place, w.name as workerName, u.username as authorizedBy, m.name, m.unit, SUM(oi.quantity) as sumQuantityOut, CONCAT('R$ ',FORMAT(MAX(oi.value), 2, 'pt_BR')) as maxPriceValueOut, SUM(oi.quantity)*MAX(oi.value) as totalPrice, o.id, sum(ifnull(r.quantity,0)) as SumQuantityReturned, (SUM(oi.quantity) - sum(ifnull(r.quantity,0))) as sumEffectiveQuantityOut, COUNT(oi.material_id) as outputFrequency from materials_out_items as oi left join materials_out as o on oi.material_out_id = o.id left join workers as w on o.worker_id=w.id left join users as u on o.authorized_by=u.id left join materials as m on oi.material_id=m.id left join (select ii.material_id as materialIdIn, SUM(ii.quantity) as quantity, i.req_maintenance, DATE(i.created_at) as createdAtIn, i.return_id from materials_in_items as ii left join materials_in as i on ii.material_in_id = i.id where i.material_intype_id=3 group by materialIdIn, i.return_id) as r on o.id = r.return_id and oi.material_id = r.materialIdIn where o.material_outtype_id=1 group by materialIdOut, reqMaintenance, createdAtOut having (createdAtOut BETWEEN CAST('${req.body.startDate}' AS DATE) AND CAST('${req.body.endDate}' AS DATE) AND sumEffectiveQuantityOut>0) order by DATE(createdAtOut)`, { type: QueryTypes.SELECT });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async materialsRelevanceBalance(req, res) {
    try {
      // eslint-disable-next-line quotes
      const result = await Material.sequelize.query(`SELECT m.id as materialId, m.name, m.unit, ifnull(b.frequencyInput,0) as frequencyInput, b.dateInitialQuantity, ifnull(b.initialQuantity,0) initialQuantity, ifnull(b.sumInput,0) as sumInput, ifnull(b.frequencyOutput,0) as frequencyOutput, ifnull(b.sumOutput,0) as sumOutput, ifnull(b.sumFrequency,0) as sumFrequency, ifnull(b.balance,0) as balance from materials AS m LEFT JOIN ( ( (select ii.material_id, materials.name, materials.unit, ifnull(COUNT(ii.material_id),0) as frequencyInput, DATE_FORMAT(mi.date_initial_quantity,'%d/%m/%Y %H:%i') as dateInitialQuantity, mi.initial_quantity as initialQuantity, ifnull(SUM(ii.quantity),0) as sumInput, ifnull(oi.frequencyOutput,0) as frequencyOutput, ifnull(oi.sumOutput,0) as sumOutput, ifnull(COUNT(ii.material_id),0) + ifnull(oi.frequencyOutput,0) as sumFrequency, ifnull(SUM(ii.quantity),0) - ifnull(oi.sumOutput,0) as balance from materials_in_items as ii left join (select moi.material_id as material_id, COUNT(moi.material_id) as frequencyOutput, SUM(moi.quantity) as sumOutput from materials_out_items as moi group by moi.material_id) as oi on ii.material_id = oi.material_id left join materials on ii.material_id=materials.id left join materials_inventory as mi on materials.id = mi.material_id group by ii.material_id) union (select oi.material_id as materialId, materials.name, materials.unit, ifnull(ii.frequencyInput,0) as frequencyInput, DATE_FORMAT(mi.date_initial_quantity,'%d/%m/%Y %H:%i') as dateInitialQuantity, mi.initial_quantity as initialQuantity, ifnull(ii.sumInput,0) as sumInput, ifnull(COUNT(oi.material_id),0) as frequencyOutput, ifnull(SUM(oi.quantity),0) as sumOutput, ifnull(ii.frequencyInput,0) + ifnull(COUNT(oi.material_id),0) as sumFrequency, ifnull(ii.sumInput,0) - ifnull(SUM(oi.quantity),0) as balance from materials_out_items as oi left join (select mii.material_id as material_id, COUNT(mii.material_id) as frequencyInput, SUM(mii.quantity) as sumInput from materials_in_items as mii group by mii.material_id) as ii on oi.material_id = ii.material_id left join materials on oi.material_id=materials.id left join materials_inventory as mi on materials.id = mi.material_id group by oi.material_id) ) order by sumFrequency desc ) AS b on m.id = b.material_id order by b.sumFrequency desc`, { type: QueryTypes.SELECT });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async provisionInput(req, res) {
    try {
      const result = await Material.sequelize.query(`select DATE(inItem.createdAtIn) as createdAtIn, DATE_FORMAT(DATE(inItem.createdAtIn),'%d/%m/%Y') as createdAtInBr, ii.material_id as materialIdIn,  inItem.reqMaintenance, inItem.requiredBy, materials.name, materials.unit, SUM(ii.quantity) as sumQuantityIn,  CONCAT('R$ ',FORMAT(MAX(ii.value), 2, 'pt_BR')) as maxPriceValueInBr, inItem.intypeId, inItem.intype, COUNT(ii.material_id) as inputFrequency, SUM(ii.quantity)*MAX(ii.value) as totalPrice, inItem.receivedBy from materials_in_items as ii left join (select i.id, i.req_maintenance as reqMaintenance, i.required_by as requiredBy, i.material_intype_id as intypeId, it.type as intype, i.created_at as createdAtIn, u.username as receivedBy from materials_in as i left join materials_intypes as it on i.material_intype_id=it.id left join users as u on i.user_id=u.id) as inItem on ii.material_in_id = inItem.id left join materials on ii.material_id=materials.id where (inItem.intypeId<>3) group by ii.material_id, DATE(inItem.createdAtIn) having createdAtIn BETWEEN CAST('${req.body.startDate}' AS DATE) AND CAST('${req.body.endDate}' AS DATE) order by DATE(createdAtIn)`, { type: QueryTypes.SELECT });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  async maintenanceBalanceOutput(req, res) {
    let other = '';
    if (req.body.deficit) other = 'AND quantityBalance<0';
    try {
      const result = await Material.sequelize.query(`select outItem.reqMaintenance, outItem.workerName, outItem.authorizedBy, oi.material_id as materialIdOut, materials.name, materials.unit, SUM(oi.quantity) as sumQuantityOut, MAX(oi.value) as maxPriceValueOut, DATE_FORMAT(MAX(outItem.createdAtOut),'%d/%m/%Y %H:%i') as maxCreatedAtOut, outItem.outtypeId, outItem.place, iiReturn.sumQuantityIn as SumQuantityReturned,  (SUM(oi.quantity) - ifnull(iiReturn.sumQuantityIn,0)) as sumEffectiveQuantityOut, iiSipac.sumQuantityIn as SumQuantitySipac,  (ifnull(iiSipac.sumQuantityIn,0) - (SUM(oi.quantity) - ifnull(iiReturn.sumQuantityIn,0))) as quantityBalance from ((( materials_out_items as oi left join (select o.id, o.req_maintenance as reqMaintenance, o.worker_id, w.name as workerName, o.authorized_by, o.place as place, u.username as authorizedBy, o.material_outtype_id as outtypeId, o.created_at as createdAtOut from materials_out as o left join workers as w on o.worker_id=w.id left join users as u on o.authorized_by=u.id) as outItem on oi.material_out_id = outItem.id  left join (select ii.material_id as materialIdIn, SUM(ii.quantity) as sumQuantityIn, i.req_maintenance  from materials_in_items as ii left join materials_in as i on ii.material_in_id = i.id where i.material_intype_id=3 group by ii.material_id, i.req_maintenance) as iiReturn on oi.material_id=iiReturn.materialIdIn AND outItem.reqMaintenance=iiReturn.req_maintenance) left join (select ii.material_id as materialIdIn, SUM(ii.quantity) as sumQuantityIn, MAX(ii.value) as maxPriceValueIn, MAX(i.created_at) as maxCreatedAtIn, i.req_maintenance, i.material_intype_id from materials_in_items as ii left join materials_in as i on ii.material_in_id = i.id where i.material_intype_id<=2 group by ii.material_id, i.req_maintenance) as iiSipac on oi.material_id=iiSipac.materialIdIn AND outItem.reqMaintenance=iiSipac.req_maintenance) left join materials on oi.material_id=materials.id) where (outItem.outtypeId=1) group by oi.material_id, outItem.reqMaintenance having (MAX(outItem.createdAtOut) BETWEEN CAST('${req.body.startDate}' AS DATE) AND CAST('${req.body.endDate}' AS DATE)) ${other}`, { type: QueryTypes.SELECT });
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new MaterialRawController();
