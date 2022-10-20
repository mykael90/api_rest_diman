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
